import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

const NotificationsApp = lazyWithReducer('notesApp', () => import('./NotificationsApp'), reducer);

/**
 * The Notifications app config.
 */
const NotificationsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/notifications',
			children: [
				{
					path: '',
					element: <NotificationsApp />,
					exact: true
				}
			]
		}
	]
};

export default NotificationsAppConfig;
