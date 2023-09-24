import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const CryptoDashboardApp = lazyWithSlices(() => import('./CryptoDashboardApp'), slices);

const CryptoDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/crypto',
			element: <CryptoDashboardApp />
		}
	]
};

export default CryptoDashboardAppConfig;
