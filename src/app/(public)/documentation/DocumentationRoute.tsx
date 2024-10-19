import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import DocumentationLayout from './layout/DocumentationLayout';
import documentationLayoutSettings from '@/app/(public)/documentation/layout/documentationLayoutSettings';

/**
 * Documentation Route
 */
const DocumentationRoute: FuseRouteItemType = {
	path: 'documentation',
	auth: null,
	element: <DocumentationLayout />,
	settings: documentationLayoutSettings,
	children: [
		{
			path: '',
			element: <Navigate to="getting-started/introduction" />
		}
	]
};

export default DocumentationRoute;
