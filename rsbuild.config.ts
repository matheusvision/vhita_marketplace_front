import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig, loadEnv } from '@rsbuild/core';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		template: './public/index.html'
	},
	output: {
		distPath: {
			root: 'build'
		}
	},
	source: {
		define: publicVars
	},
	tools: {
		rspack: {
			module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							{
								loader: 'postcss-loader',
								options: {
									postcssOptions: {
										plugins: {
											tailwindcss: {},
											autoprefixer: {}
										}
									}
								}
							}
						],
						type: 'css'
					},
					{
						// Match .png asset
						// You can change this regular expression to match different types of files
						test: /\.png$/,
						type: 'asset/resource',
						generator: {
							filename: 'static/media/[name].[hash][ext]'
						}
					}
				]
			}
		}
	}
});
