import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const MetricsApp = lazy(() => import('./MetricsApp'));

/**
 * Project Dashboard App  Route
 */
const MetricsAppRoute: FuseRouteItemType = {
	path: 'metrics',
	element: <MetricsApp />
};

export default MetricsAppRoute;
