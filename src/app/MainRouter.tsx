import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import routes from 'app/configs/routesConfig';
import { useMemo } from 'react';
import routes from 'app/configs/routesConfig';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';

function MainRouter() {
	const router = useMemo(
		() =>
			createBrowserRouter(
				routes.map((route) => ({
					...route,
					element: <ErrorBoundary>{route.element}</ErrorBoundary>
				}))
			),
		[routes]
	);

	return <RouterProvider router={router} />;
}

export default MainRouter;
