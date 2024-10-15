import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import DocumentationLayout from '@/app/(public)/documentation/layout/DocumentationLayout';
import documentationLayoutSettings from '@/app/(public)/documentation/layout/documentationLayoutSettings';

const ChangelogDoc = lazy(() => import('./ChangelogDoc'));

/**
 * Changelog Doc Route
 */
const ChangelogDocRoute: FuseRouteItemType = {
	path: 'documentation/changelog',
	element: <DocumentationLayout />,
	settings: documentationLayoutSettings,
	children: [
		{
			path: '',
			element: <ChangelogDoc />
		}
	]
};

export default ChangelogDocRoute;
