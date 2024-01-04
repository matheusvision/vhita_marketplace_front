// npx @rtk-query/codegen-openapi openapi-config.ts
import type { ConfigFile } from '@rtk-query/codegen-openapi';

const appName = 'Auth';

const config: ConfigFile = {
	schemaFile: './mock-api.json',
	apiFile: 'app/store/apiService.ts',
	apiImport: 'apiService',
	outputFile: `./${appName}Api.ts`,
	exportName: `${appName}Api`,
	hooks: true,
	filterEndpoints: (name) => {
		return name.includes(appName);
		// return name.includes('Profile') && !name.includes('Chat');
	},
	// filterEndpoints: [/'help-center'/],
	tag: true
};

export default config;
