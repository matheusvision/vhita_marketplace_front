import { forwardRef, ComponentType } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface WithRouterProps {
	location: ReturnType<typeof useLocation>;
	params: Record<string, string>;
	navigate: ReturnType<typeof useNavigate>;
}

const withRouterAndRef =
	<Props extends WithRouterProps>(Component: ComponentType<Props>) =>
	(props: Omit<Props, keyof WithRouterProps>) => {
		const location = useLocation();
		const params = useParams();
		const navigate = useNavigate();
		const WithRouterAndRef = forwardRef((props, ref) => (
			<Component {...(props as Props)} location={location} params={params} navigate={navigate} forwardRef={ref} />
		));

		const name = Component.displayName || Component.name;
		WithRouterAndRef.displayName = `withRouterAndRef(${name})`;
		return WithRouterAndRef;
	};

export default withRouterAndRef;
