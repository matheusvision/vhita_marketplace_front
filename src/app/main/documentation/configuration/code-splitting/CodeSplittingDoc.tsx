import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

/**
 * Code Splitting Doc
 * This document provides information on how to use code splitting.
 */
function CodeSplittingDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Code Splitting
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				By code-splitting your app, you can "lazy-load" only the content that's needed by users at any given
				moment, significantly boosting your app's performance. In addition to avoiding loading code that the
				user may never need, you also reduce the amount of code needed for the initial load.
			</Typography>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Route-based code splitting
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				We are using <b>React.lazy</b> function to dynamically import component.
				<br />
				<b>FuseSuspense</b> component is created to avoid the repetition of <b>React.Suspense </b>
				component defaults, which is used in the theme layouts.
				<br />
				Check out the examples below to see dynamically or regular way of importing the components.
			</Typography>

			<>
				<Typography
					variant="h5"
					className="text-20 mt-20 mb-10 font-700"
				>
					Using `lazyWithSlices` in configuration pages with route definitions
				</Typography>
				<Typography
					component="p"
					className="mb-16"
				>
					`lazyWithSlices` is commonly used in configuration pages with route definitions to improve the
					performance of the application. By using `lazyWithSlices`, you can lazily load the configuration
					page and inject reducers for the provided slices, which can reduce the amount of JavaScript that
					needs to be downloaded and parsed by the browser, leading to faster load times and a better user
					experience.
				</Typography>
				<Typography
					component="p"
					className="mb-16"
				>
					Here's an example of how you can use `lazyWithSlices` in a configuration page with route
					definitions:
				</Typography>
				<FuseHighlight
					component="pre"
					className="language-typescript mb-32"
				>
					{`
					import lazyWithSlices from 'app/store/lazyWithSlices';
					import { RouteConfig } from 'react-router-config';
					import { AcademyAppConfig } from 'app/main/apps/academy/AcademyAppConfig';

					const routes: RouteConfig[] = [
						{
						path: '/apps/academy',
						component: lazyWithSlices(() => import('./AcademyAppConfig'), [
							{
							name: 'academy',
							reducer: academyReducer,
							},
						]),
						},
					];
					`}
				</FuseHighlight>
				<Typography
					component="p"
					className="mb-16"
				>
					In this example, we import the `lazyWithSlices` function from the `app/store/lazyWithSlices` file,
					and the `AcademyAppConfig` component from the `app/main/apps/academy/AcademyAppConfig` file. We then
					define an array of routes that contains a route for the `AcademyAppConfig` component. We use the
					`lazyWithSlices` function to lazily load the `AcademyAppConfig` component and inject a reducer for
					the `academy` slice. By using `lazyWithSlices` in this way, we can improve the performance of the
					application by reducing the amount of JavaScript that needs to be downloaded and parsed by the
					browser.
				</Typography>
			</>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Code splitting the Redux reducers (Dynamically loaded reducers)
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				We created Higher Order Component <code>withReducer</code> to load redux reducer before the component
				render.
				<br />
				You just need to pass the <b>key</b> and the <b>reducer</b> to the component.
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-jsx my-16"
			>
				{`
				import withReducer from 'app/store/withReducer';
				import reducer from './store';
				.
				.
				export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
			`}
			</FuseHighlight>
		</>
	);
}

export default CodeSplittingDoc;
