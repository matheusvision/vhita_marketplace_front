import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import documentationLayoutSettings from '@/app/(public)/documentation/layout/documentationLayoutSettings';
import DocumentationLayout from '@/app/(public)/documentation/layout/DocumentationLayout';
import documentationAuth from '@/app/(public)/documentation/layout/documentationAuth';

const ReactHookFormDoc = lazy(() => import('./react-hook-form/ReactHookFormDoc'));
const GoogleMapReactDoc = lazy(() => import('./google-map-react/GoogleMapReactDoc'));
const ReactApexchartsDoc = lazy(() => import('./react-apexcharts/ReactApexchartsDoc'));

/**
 * Third Party Components Doc Routes
 */
const ThirdPartyComponentsRoute: FuseRouteItemType = {
	path: '/documentation/third-party-components',
	element: <DocumentationLayout />,
	settings: documentationLayoutSettings,
	auth: documentationAuth,
	children: [
		{
			path: '',
			element: <Navigate to="react-hook-form" />
		},
		{
			path: 'react-hook-form',
			element: <ReactHookFormDoc />
		},
		{
			path: 'google-map-react',
			element: <GoogleMapReactDoc />
		},
		{
			path: 'react-apexcharts',
			element: <ReactApexchartsDoc />
		}
	]
};

export default ThirdPartyComponentsRoute;
