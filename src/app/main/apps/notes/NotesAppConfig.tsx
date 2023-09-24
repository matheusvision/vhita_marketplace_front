import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const NotesApp = lazyWithSlices(() => import('./NotesApp'), slices);

const NotesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/notes',
			element: <NotesApp />,
			children: [
				{
					path: ':filter',
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
