import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
		}),
		checker({
			overlay: { initialIsOpen: false },
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
			},
		}),
		tsconfigPaths({
			parseNative: false,
		}),
		svgrPlugin(),
		{
			name: 'custom-hmr-control',
			handleHotUpdate({ file, server }) {
				if (file.includes('src/app/configs/')) {
					server.ws.send({
						type: 'full-reload',
					});
					return [];
				}
				return;
			},
		},
	],
	build: {
		outDir: 'build',
	},
	server: {
		open: true,
		port: 3000
	},
	define:{
		global: 'window',
	},
	resolve: {
		alias: {
			'@': '/src',
			"@fuse": "/src/@fuse",
			"@history": "/src/@history",
			"@lodash": "/src/@lodash",
			"@mock-api": "/src/@mock-api",
			"@schema": "/src/@schema",
			"app/store": "/src/app/store",
			"app/shared-components": "/src/app/shared-components",
			"app/configs": "/src/app/configs",
			"app/theme-layouts": "/src/app/theme-layouts",
			"app/AppContext": "/src/app/AppContext"
		},
	},
	"optimizeDeps": {
		"esbuildOptions": {
			"loader": {
				".js": "jsx",
			},
		},
	}
});
