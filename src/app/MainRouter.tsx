import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import routes from 'app/configs/routesConfig';
import { useMemo } from 'react';
import routes from 'app/configs/routesConfig';

function MainRouter() {
	// const appContext = useContext(AppContext);
	// const { routes } = appContext;
	const router = useMemo(() => createBrowserRouter(routes), [routes]);

	// console.info('++router', router);
	// console.info('++router', router.routes);
	return <RouterProvider router={router} />;
}

export default MainRouter;
