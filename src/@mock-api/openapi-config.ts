// npx @rtk-query/codegen-openapi openapi-config.ts
import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
	schemaFile: './mock-api.json',
	apiFile: '../app/store/apiService.ts',
	apiImport: 'apiService',
	outputFile: './FileManagerApi.ts',
	exportName: 'FileManagerApi',
	hooks: true,
	filterEndpoints: (name) => {
		return name.includes('FileManager');
	},
	// filterEndpoints: [/'help-center'/],
	tag: true
};

export default config;
