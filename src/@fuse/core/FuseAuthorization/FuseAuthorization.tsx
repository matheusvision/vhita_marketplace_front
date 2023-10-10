import { Component, ReactNode } from 'react';
import { matchRoutes } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import AppContext, { AppContextType } from 'app/AppContext';
import withRouter from '@fuse/core/withRouter';
import history from '@history';
import { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

let loginRedirectUrl: string = null;

type FuseAuthorizationProps = {
	children: ReactNode;
	location: Location;
	userRole: string[] | string;
	loginRedirectUrl: string;
} & WithRouterProps;

type State = AppContextType & {
	accessGranted: boolean;
};

/**
 * FuseAuthorization is a higher-order component that wraps its child component which handles the authorization logic of the app.
 * It checks the provided Auth property from FuseRouteItemType (auth property) against the current logged-in user role.
 */
class FuseAuthorization extends Component<FuseAuthorizationProps, State> {
	defaultLoginRedirectUrl: string;

	constructor(props: FuseAuthorizationProps, context: AppContextType) {
		super(props);

		const { routes } = context;

		this.state = {
			accessGranted: true,
			routes
		};

		this.defaultLoginRedirectUrl = props.loginRedirectUrl || '/';
	}

	componentDidMount() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps: FuseAuthorizationProps, nextState: State) {
		const { accessGranted } = this.state;

		return nextState.accessGranted !== accessGranted;
	}

	componentDidUpdate() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props: FuseAuthorizationProps, state: State) {
		const { location, userRole } = props;
		const { pathname } = location;
		const matchedRoutes = matchRoutes(state.routes, pathname);
		const matched = matchedRoutes ? matchedRoutes[0] : false;

		if (!matched) {
			return { accessGranted: true };
		}

		const { route }: { route: FuseRouteItemType } = matched;

		return {
			accessGranted: FuseUtils.hasPermission(route.auth, userRole)
		};
	}

	redirectRoute() {
		const { location, userRole } = this.props;
		const { pathname } = location;
		const redirectUrl = loginRedirectUrl || this.defaultLoginRedirectUrl;

		if (!userRole || userRole.length === 0) {
			// User is guest. Redirect to Login Page.
			setTimeout(() => history.push('/sign-in'), 0);
			loginRedirectUrl = pathname;
		} else {
			// User is member. Redirect to dashboard or loginRedirectUrl.
			setTimeout(() => history.push(redirectUrl), 0);
			loginRedirectUrl = this.defaultLoginRedirectUrl;
		}
	}

	render() {
		const { accessGranted } = this.state;
		const { children } = this.props;

		return accessGranted ? children : null;
	}
}

FuseAuthorization.contextType = AppContext;

export default withRouter(FuseAuthorization);
