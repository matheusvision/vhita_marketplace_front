import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const NotesApp = lazyWithSlices(() => import('./NotesApp'), slices);

/**
 * The notes app config.
 */
const NotesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/notes',
			children: [
				{
					path: '',
					element: <NotesApp />,
					exact: true
				},
				{
					path: ':filter',
					element: <NotesApp />,
					children: [
						{
							path: ':id'
						}
					]
				}
			]
		}
	]
};

export default NotesAppConfig;
