import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const CalendarApp = lazyWithSlices(() => import('./CalendarApp'), slices);

const CalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/calendar',
			element: <CalendarApp />
		}
	]
};

export default CalendarAppConfig;
