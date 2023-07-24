import { injectReducer } from 'app/store/index';

const withReducer = (key: any, reducer: any) => (WrappedComponent: any) => {
	injectReducer(key, reducer);

	return function (props: any) {
		return <WrappedComponent {...props} />;
	};
};

export default withReducer;
