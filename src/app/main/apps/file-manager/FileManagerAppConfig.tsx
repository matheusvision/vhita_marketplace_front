import { lazy } from 'react';
import withSlices from 'app/store/withSlices';
import slices from './store';

const FileManagerApp = lazy(() => import('./FileManagerApp'));

const FileManagerAppWithSlices = withSlices(slices)(FileManagerApp);

/**
 * The file manager app config.
 */
const FileManagerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/file-manager',
			element: <FileManagerAppWithSlices />,
			children: [
				{
					path: ':folderId'
				}
			]
		}
	]
};

export default FileManagerAppConfig;
