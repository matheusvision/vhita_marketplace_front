import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const FinanceDashboardApp = lazyWithSlices(() => import('./FinanceDashboardApp'), slices);

const FinanceDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/finance',
			element: <FinanceDashboardApp />
		}
	]
};

export default FinanceDashboardAppConfig;
