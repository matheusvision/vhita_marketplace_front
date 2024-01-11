import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig, loadEnv } from '@rsbuild/core';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
	plugins: [pluginReact()],
	dev: {
		startUrl: true,
		// hmr: true,
		progressBar: true
	},
	server: {
		port: 3000
	},
	html: {
		template: './public/index.html'
	},
	output: {
		distPath: {
			root: 'build'
		},
		sourceMap: isDevelopment
			? {
					js: 'source-map',
					css: true
			  }
			: undefined
	},
	source: {
		define: publicVars
	},
	tools: {
		rspack: {
			plugins: [
				new NodePolyfillPlugin({
					excludeAliases: ['console']
				})
			],
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
