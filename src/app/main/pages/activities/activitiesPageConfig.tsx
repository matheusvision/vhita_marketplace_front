import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import { lazy } from 'react';

const ActivitiesPage = lazy(() => import('./ActivitiesPage'));

const activitiesPageConfig: FuseRouteConfigType = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'pages/activities',
			element: <ActivitiesPage />
		}
	]
};

export default activitiesPageConfig;
