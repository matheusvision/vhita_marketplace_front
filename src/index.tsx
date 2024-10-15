import '@i18n/i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'src/configs/routesConfig';
import { worker } from '@mock-utils/mswMockAdapter';

async function mockSetup() {
	return worker.start({
		onUnhandledRequest: 'bypass'
	});
}

/**
 * The root element of the application.
 */
const container = document.getElementById('app');

if (!container) {
	throw new Error('Failed to find the root element');
}

mockSetup().then(() => {
	/**
	 * The root component of the application.
	 */
	const root = createRoot(container);

	const router = createBrowserRouter(routes);

	root.render(<RouterProvider router={router} />);
});
