import { lazy } from 'react';

const CalendarApp = lazy(() => import('./CalendarApp'));

/**
 * The Calendar App Config.
 */
const CalendarAppConfig = {
	settings: {},
	routes: [
		{
			path: 'apps/calendar',
			element: <CalendarApp />
		}
	]
};

export default CalendarAppConfig;
