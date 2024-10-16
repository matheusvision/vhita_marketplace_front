import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import documentationLayoutSettings from '@/app/(public)/documentation/layout/documentationLayoutSettings';
import DocumentationLayout from '@/app/(public)/documentation/layout/DocumentationLayout';

const AuthorizationDoc = lazy(() => import('./AuthorizationDoc'));

/**
 * Authorization Doc Route
 */
const AuthorizationDocRoute: FuseRouteItemType = {
	path: 'documentation/authorization',
	element: <DocumentationLayout />,
	settings: documentationLayoutSettings,
	children: [
		{
			path: '',
			element: <AuthorizationDoc />
		}
	]
};

export default AuthorizationDocRoute;
