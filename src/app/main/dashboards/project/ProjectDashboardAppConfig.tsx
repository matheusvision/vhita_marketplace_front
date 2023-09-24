import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const ProjectDashboardApp = lazyWithSlices(() => import('./ProjectDashboardApp'), slices);

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/project',
			element: <ProjectDashboardApp />
		}
	]
};

export default ProjectDashboardAppConfig;
