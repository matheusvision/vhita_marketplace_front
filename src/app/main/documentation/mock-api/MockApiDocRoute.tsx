import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import DocumentationPageLayout from '../DocumentationPageLayout';

const MockApiDoc = lazy(() => import('./MockApiDoc'));

/**
 * Mock Api Doc Route
 */
const MockApiDocRoute: FuseRouteItemType = {
	path: 'documentation/mock-api',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <MockApiDoc />
		}
	]
};

export default MockApiDocRoute;
