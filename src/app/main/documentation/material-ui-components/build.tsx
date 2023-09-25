/* eslint-disable import/no-extraneous-dependencies */
import fs, { PathOrFileDescriptor } from 'fs';
import Beautify from 'js-beautify';
import _ from 'lodash';
import { marked } from 'marked';
import path from 'path';
import { spawn } from 'child_process';
import Promise from 'promise';

const demoDir = 'src/app/main/documentation/material-ui-components/components';
const rootDirectory = path.resolve(__dirname);
const examplesDirectory = path.resolve(rootDirectory, './components');
const pagesDirectory = path.resolve(rootDirectory, './pages');
const routesFilePath = path.resolve(rootDirectory, './MaterialUIComponentsRoutes.ts');
const navigationFilePath = path.resolve(rootDirectory, './MaterialUIComponentsNavigation.ts');

const demoRegexp = /^"demo": "(.*)"/;
const componentRegexp = /^"component": "(.*)"/;
const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
// const titleRegExp = /# (.*)[\r\n]/;
// const headerKeyValueRegExp = /(.*): (.*)/g;
const emptyRegExp = /^\s*$/;

/*
eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,no-cond-assign,@typescript-eslint/no-unsafe-return
*/
marked.Lexer.prototype.lex = function lex(src) {
	src = src
		.replace(/\r\n|\r/g, '\n')
		.replace(/\t/g, '    ')
		.replace(/\u2424/g, '\n');

	this.blockTokens(src, this.tokens);

	let next;
	// eslint-disable-next-line no-cond-assign
	while ((next = this.inlineQueue.shift())) {
		this.inlineTokens(next.src, next.tokens);
	}

	return this.tokens;
};

const renderer = new marked.Renderer();

marked.setOptions({
	gfm: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartypants: false,
	renderer
});

/* const BeautifyConfig = {
    "indent_size": 2,
    "e4x"        : true,
    "js"         : {
        "allowed_file_extensions"  : ["js", "jsx", "json", "eslintrc", "jsbeautifyrc"],
        "brace_style"              : "collapse-preserve-inline",
        "break_chained_methods"    : false,
        "comma_first"              : false,
        "e4x"                      : true,
        "end_with_newline"         : false,
        "indent_char"              : " ",
        "indent_level"             : 0,
        "jslint_happy"             : false,
        "keep_array_indentation"   : false,
        "keep_function_indentation": false,
        "max_preserve_newlines"    : 0,
        "preserve_newlines"        : true,
        "space_after_anon_function": true,
        "space_before_conditional" : true,
        "space_in_empty_paren"     : false,
        "space_in_paren"           : true,
        "unescape_strings"         : false,
        "wrap_line_length"         : 120
    }
}; */

renderer.heading = (text, level) => {
	let className = '';
	switch (level) {
		case 1:
			className = 'text-40 my-16 font-700';
			break;
		case 2:
			className = 'text-32 mt-40 mb-10 font-700';
			break;
		case 3:
			className = 'text-20 mt-20 mb-10 font-700';
			break;
		default:
			className = 'text-16 mt-16 mb-10';
	}

	return `<Typography className="${className}" component="h${level}">${text}</Typography>\n`;
};

renderer.paragraph = (text) => {
	return `<Typography className="mb-40" component="div">${text}</Typography>\n`;
};

renderer.code = (code, lang) => {
	const response = `
<FuseHighlight component="pre" className="language-${lang}">
{%% 
${code}
%%}
</FuseHighlight>
`;
	return response.replace(/`/g, '\\`').replace(/%%/g, '`');
};

renderer.codespan = (code: string) => {
	const response = `<code>{@@${_.unescape(code)}@@}</code>`;
	return response.replace(/@@/g, '`');
};

const rmDir = (dirPath: string) => {
	try {
		const files = fs.readdirSync(dirPath);
		if (files.length > 0)
			files.forEach((item) => {
				const filePath = `${dirPath}/${item}`;
				if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
				else rmDir(filePath);
			});
	} catch (e) {
		return;
	}
	fs.rmdirSync(dirPath);
};

function allReplace(str: string, obj: Record<string, string>): string {
	let retStr = str;
	Object.keys(obj).forEach((key) => {
		retStr = retStr.replace(new RegExp(key, 'g'), obj[key]);
	});
	return retStr;
}

function getContents(markdown: string) {
	return markdown
		.replace(headerRegExp, '') // Remove header information
		.split(/^{{|}}$/gm) // Split markdown into an array, separating demos
		.filter((content) => !emptyRegExp.test(content)); // Remove empty lines
}

function getHtmlCode(markdownSource: string, file: string) {
	let contentsArr = getContents(markdownSource);
	contentsArr = contentsArr.map((content) => {
		const match = content.match(demoRegexp);
		if (match) {
			const demoOptions = JSON.parse(`{${content}}`);
			const name = demoOptions.demo;
			const iframe = !!demoOptions.iframe;
			const importPath = `../components/${path.basename(file)}/${name}`;
			return `\n<FuseExample
                    name="${name}"
                    className="my-24"
                    iframe={${iframe}}
                    component="{require('${importPath}').default}" 
                    raw="{require('!raw-loader!${importPath}')}"
                    />`;
		}
		const muiComponent = content.match(componentRegexp);
		if (muiComponent) {
			return '';
		}

		return content;
	});
	const response = marked(contentsArr.join(''))
		.replace(/"{/g, '{')
		.replace(/}"/g, '}')
		.replace(/(<\s*\/?\s*)p(\s*([^>]*)?\s*>)/g, '$1Typography$2')
		.replace(/class=/g, 'className=')
		.replace(/<img([^>]+)(\s*[^/])>/gm, '$1/>')
		.replace(/<br>/g, '<br/>')
		.replace(/\/static\//g, '/material-ui-static/')
		.replace(/<!-- #default-branch-switch -->/g, '');
	return response;
}

function readDir(dir: string) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, list) => {
			if (err) {
				reject(err);
			}
			resolve({
				dir,
				list
			});
		});
	});
}

function writePages(dir: string, list: string[]): Promise<string[]> {
	const pages: string[] = [];
	return new Promise<string[]>((resolve, reject) => {
		list.forEach((file: string) => {
			file = path.resolve(dir, file);
			pages.push(path.basename(file));

			fs.stat(file, (err: NodeJS.ErrnoException | null, stat: fs.Stats) => {
				if (err) {
					// Handle the error if needed
					reject(err);
					return;
				}

				if (stat && stat.isDirectory()) {
					// Assuming writePage is another function that handles directories
					writePage(file); // Make sure writePage is defined and imported
				}
			});
		});

		resolve(pages);
	});
}

function writePage(file: string) {
	const markdownSource = fs.readFileSync(`${file}/${path.basename(file)}.md`, 'utf8');
	const fileName = _.upperFirst(_.camelCase(path.basename(file)));
	const htmlCode = getHtmlCode(markdownSource, file);

	const contentJSX = `
                <>
					<div className="flex flex-1 grow-0 items-center justify-end">
					  <Button 
							className="normal-case"
							variant="contained"
                            color="secondary"
							component="a" 
							href="https://mui.com/components/${path.basename(file)}" 
							target="_blank"
							role="button"
							startIcon={<FuseSvgIcon>heroicons-outline:external-link</FuseSvgIcon>}
							>
							Reference
						</Button>
					</div>
                     ${htmlCode}
                </>
    `;

	// contentJSX = Beautify(contentJSX, BeautifyConfig);

	const content = `import FuseExample from '@fuse/core/FuseExample';
                   import FuseHighlight from '@fuse/core/FuseHighlight';
                   import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
                   import Button from '@mui/material/Button';
                   import Icon from '@mui/material/Icon';
                   import Typography from '@mui/material/Typography';
                   /* eslint import/no-webpack-loader-syntax: off */
                   /* eslint import/extensions: off */
                   /* eslint no-unused-vars: off */
                   /* eslint-disable jsx-a11y/accessible-emoji */
                  
                   function ${fileName}Doc(props) {
                     return (
                       ${contentJSX}
                     );
                   }
                   
                   export default ${fileName}Doc;
                   `;

	// content = Beautify(content, BeautifyConfig);

	fs.writeFileSync(path.resolve(pagesDirectory, `${fileName}.tsx`), content);
}

function writeRouteFile(pages: string[]) {
	const importPath = "const %s = lazy(() => import('./pages/%s'));";
	const imports = pages.map((page) => {
		const componentName = _.upperFirst(_.camelCase(page));
		return importPath.replace(/%s/g, componentName);
	});

	const routeObject = "{ path : 'material-ui-components/%s', element: <%p />}";
	const routes = pages.map((page) => {
		const componentName = _.upperFirst(_.camelCase(page));

		const newRouteObject = allReplace(routeObject, {
			'%s': page,
			'%p': componentName
		});

		return newRouteObject;
	});

	const content = Beautify(
		`
		import { lazy } from 'react';
        
        ${imports.join('')}
        
        const MaterialUIComponentsRoutes =  [${routes.join()}];
        
        export default MaterialUIComponentsRoutes;
        
        `
	);

	fs.writeFileSync(path.resolve(routesFilePath), content);
}

function writeNavigationFile(pages: string[]) {
	const navigationObject =
		"{ 'id'   : '%id', 'title': '%title', 'type' : 'item', 'url'  : '/documentation/material-ui-components/%url' }";
	const navigation = pages.map((page) => {
		const componentName = _.startCase(page);

		const newNavigationObject = allReplace(navigationObject, {
			'%id': _.camelCase(page),
			'%title': componentName,
			'%url': page
		});

		return newNavigationObject;
	});

	const content = Beautify(
		`
        const MaterialUIComponentsNavigation =  {
													id: 'material-ui-components',
													title: 'Material UI Components',
													type: 'collapse',
													icon: 'layers',
													children: [${navigation.join()}]
												};
												
        export default MaterialUIComponentsNavigation;
        
        `
	);
	fs.writeFileSync(path.resolve(navigationFilePath), content);
}

// eslint-disable-next-line no-unused-vars
type DoneCallback = (error: NodeJS.ErrnoException | null, results?: string[]) => void;

function filewalker(dir: string, done: DoneCallback): void {
	let results: string[] = [];

	fs.readdir(dir, (err: NodeJS.ErrnoException | null, list: string[]) => {
		if (err) {
			return done(err);
		}

		let pending = list.length;

		if (!pending) {
			return done(null, results);
		}

		list.forEach((file) => {
			file = path.resolve(dir, file);

			fs.stat(file, (_err: NodeJS.ErrnoException | null, stat: fs.Stats) => {
				// If directory, make a recursive call
				if (stat && stat.isDirectory()) {
					// Add directory to array [comment if you need to remove the directories from the array]
					// results.push(file);

					filewalker(file, (__err: NodeJS.ErrnoException | null, res: string[]) => {
						results = results.concat(res);
						pending -= 1;
						if (pending === 0) {
							done(null, results);
						}
					});
				} else {
					results.push(file);
					pending -= 1;
					if (pending === 0) {
						done(null, results);
					}
				}
			});
		});

		return done(null);
	});
}

function replaceInExamples() {
	filewalker(demoDir, (err, list) => {
		if (err) {
			throw err;
		}
		list.forEach((file: PathOrFileDescriptor) => {
			const fileSource = fs.readFileSync(file, 'utf8');
			const result = fileSource
				.replace(/docs\/src\/modules\/utils\/compose/g, '../../compose')
				.replace(/docs\/src\/modules\/components\/MarkdownElement/g, '../../utils/MarkdownElement')
				.replace(/docs\/src\/modules\/components\/HighlightedCode/g, '../../utils/HighlightedCode')
				.replace(/\/static\//g, '/material-ui-static/');

			try {
				fs.writeFileSync(file, result, 'utf8');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		});
	});
}

function removeExcludedComponents() {
	const excludedComponents = [
		path.resolve(examplesDirectory, './hidden'),
		path.resolve(examplesDirectory, './use-media-query'),
		path.resolve(examplesDirectory, './about-the-lab'),
		path.resolve(examplesDirectory, './material-icons'),
		path.resolve(examplesDirectory, './icons'),
		path.resolve(examplesDirectory, './pickers'),
		path.resolve(examplesDirectory, './click-away-listener'),
		path.resolve(examplesDirectory, './portal'),
		path.resolve(examplesDirectory, './textarea-autosize')
	];

	excludedComponents.forEach((_path) => rmDir(_path));
}

function removeUnnecessaryFiles() {
	filewalker(demoDir, (err, list) => {
		if (err) {
			throw err;
		}
		list.forEach((file) => {
			const extToRemove = [
				'.preview',
				'.ts',
				'.tsx',
				'-de.md',
				'-es.md',
				'-fr.md',
				'-ja.md',
				'-pt.md',
				'-ru.md',
				'-zh.md'
			];
			extToRemove.forEach((str) => {
				if (file.endsWith(str)) {
					fs.unlink(file, () => {});
				}
			});
		});
	});
}

function build() {
	fs.unlink(path.resolve(examplesDirectory, './.eslintrc.js'), () => {});

	removeUnnecessaryFiles();

	removeExcludedComponents();

	replaceInExamples();

	rmDir(pagesDirectory);

	fs.mkdirSync(pagesDirectory);

	readDir(examplesDirectory).then(({ dir: _dir, list }) => {
		writePages(_dir as string, list as string[]).then((pages) => {
			writeRouteFile(pages);

			writeNavigationFile(pages);

			const child = spawn('npm', ['run', 'lint', '--', '--fix', rootDirectory]);

			child.stdout.on('data', (data) => {
				// eslint-disable-next-line no-console
				console.log(`stdout: ${data}`);
			});

			child.stderr.on('data', (data) => {
				// eslint-disable-next-line no-console
				console.log(`stderr: ${data}`);
			});

			child.on('close', (code) => {
				// eslint-disable-next-line no-console
				console.log(`child process exited with code ${code}`);
			});
		});
	});
}

build();
