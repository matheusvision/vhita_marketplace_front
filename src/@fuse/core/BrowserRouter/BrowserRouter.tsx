import React, { useLayoutEffect, useState } from 'react';
import history from '@history';
import { BrowserRouterProps, Router } from 'react-router-dom';

function BrowserRouter(props: BrowserRouterProps) {
	const { basename, children } = props;

	const [state, setState] = useState({
		action: history.action,
		location: history.location
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			basename={basename}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		>
			{children}
		</Router>
	);
}

export default BrowserRouter;
