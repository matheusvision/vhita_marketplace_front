import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import DocumentationLayout from '@/app/(public)/documentation/layout/DocumentationLayout';
import documentationLayoutSettings from '@/app/(public)/documentation/layout/documentationLayoutSettings';

const MockApiDoc = lazy(() => import('./MockApiDoc'));

/**
 * Changelog Doc Route
 */
const MockApiDocRoute: FuseRouteItemType = {
	path: 'documentation/development/api-integration/mock-api',
	// element: <DocumentationLayout />,
	settings: documentationLayoutSettings,
	children: [
		{
			path: '',
			element: <MockApiDoc />
		}
	]
};

export default MockApiDocRoute;
