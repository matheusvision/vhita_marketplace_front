import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface WithRouterProps {
	location: ReturnType<typeof useLocation>;
	params: Record<string, string>;
	navigate: ReturnType<typeof useNavigate>;
}

const withRouter =
	<Props extends WithRouterProps>(Component: React.ComponentType<Props>) =>
	(props: Omit<Props, keyof WithRouterProps>) => {
		const location = useLocation();
		const params = useParams();
		const navigate = useNavigate();

		return <Component {...(props as Props)} location={location} params={params} navigate={navigate} />;
	};

export default withRouter;
