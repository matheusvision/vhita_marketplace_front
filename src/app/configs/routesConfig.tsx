// Dynamically import all *ConfigConfig.tsx files from the app folder
import FuseUtils from '@fuse/utils';
import { FuseRouteConfigType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { layoutConfigOnlyMain } from 'app/configs/layoutConfigTemplates';
import App from '../App';
import Error404Page from '../main/404/Error404Page';

const configModules: Record<string, unknown> = import.meta.glob('/src/app/main/**/*Config.tsx', { eager: true });

const configs: FuseRouteConfigType[] = Object.keys(configModules)
	.map((modulePath) => {
		const moduleConfigs = (configModules[modulePath] as { default: FuseRouteConfigType | FuseRouteConfigType[] })
			.default;
		return Array.isArray(moduleConfigs) ? moduleConfigs : [moduleConfigs];
	})
	.flat();

const routes: FuseRoutesType = [
	{
		path: '/',
		element: <App />,
		settings: settingsConfig,
		children: [
			{
				path: '/',
				element: <Navigate to="/dashboards/project" />
			},
			...FuseUtils.generateRoutesFromConfigs(configs, settingsConfig.defaultAuth),
			{
				path: 'loading',
				element: <FuseLoading />,
				settings: { layout: layoutConfigOnlyMain }
			},
			{
				settings: { layout: layoutConfigOnlyMain },
				path: '404',
				element: <Error404Page />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to="/404" />
	}
];

export default routes;
