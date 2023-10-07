import { injectReducer } from 'app/store';
import { Reducer } from '@reduxjs/toolkit';

/**
 * A Higher Order Component that injects a reducer into the Redux store.
 * @param key - The key to use for the reducer in the store.
 * @param reducer - The reducer to inject into the store.
 * @returns A new component with the injected reducer.
 */
const withReducer =
	<P extends object>(key: string, reducer: Reducer) =>
	(WrappedComponent: React.FC<P>) => {
		injectReducer(key, reducer);

		/**
		 * The component that wraps the provided component with the injected reducer.
		 * @param props - The props to pass to the wrapped component.
		 * @returns The wrapped component with the injected reducer.
		 */
		return function WithInjectedReducer(props: P) {
			return <WrappedComponent {...props} />;
		};
	};

export default withReducer;
