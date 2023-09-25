import {
	configureStore,
	ThunkAction,
	ThunkDispatch,
	Action,
	Reducer,
	Middleware,
	ReducersMapObject
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { createLogger } from 'redux-logger';
import _ from '@lodash';
import createReducer from './rootReducer';

/* if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		// eslint-disable-next-line global-require
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
} */

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });

	middlewares.push(logger);
}

const store = configureStore({
	reducer: createReducer({}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

type AsyncReducersType = {
	[key: string]: Reducer;
};

const asyncReducers: AsyncReducersType = {};

export const injectReducer = (key: string, reducer: Reducer) => {
	if (asyncReducers[key]) {
		return false;
	}

	asyncReducers[key] = reducer;

	store.replaceReducer(createReducer(asyncReducers));

	return store;
};

export const injectReducers = (reducers: ReducersMapObject) => {
	store.replaceReducer(createReducer(_.merge(asyncReducers, reducers)));

	return store;
};

type BaseRootState = ReturnType<typeof store.getState>;

type ExtendedRootState<T extends string, State> = BaseRootState & { [K in T]: State };

export type AppDispatch = typeof store.dispatch;

/**
 * Type to return from async actions (redux-thunk).
 * `R` describes the return value of the thunk.
 * `E` describes the extra argument type given to the action thunk, e.g.
 * `(dispatch, getState, extraArgument) => {}`
 */
export type AppThunk<R = Promise<void>, E = unknown> = ThunkAction<R, RootState, E, Action<string>>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

/**
 * Dispatch function for this application (AppState).
 * `E` describes the extra argument type given to the action thunk, e.g.
 * `(dispatch, getState, extraArgument) => {}`
 */
export type AppThunkDispatch<E = unknown> = ThunkDispatch<RootState, E, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;

type PathToType<Str extends string, T> = Str extends `${infer Start}/${infer Rest}`
	? { [P in Start as P]: PathToType<Rest, T> }
	: { [P in Str]: T };

// Process an array of slice names
type MultiplePathsToType<Slices extends unknown[], _T = unknown> = Slices extends [infer First, ...infer Rest]
	? First extends { name: string; getInitialState: () => unknown }
		? PathToType<First['name'], ReturnType<First['getInitialState']>> & MultiplePathsToType<Rest>
		: Record<string, never>
	: Record<string, never>;

export type RootStateWithSlice<SliceType extends { name: string; getInitialState: () => unknown }> = BaseRootState &
	PathToType<SliceType['name'], ReturnType<SliceType['getInitialState']>>;

export type RootState<
	T extends
		| string
		| { name: string; getInitialState: () => unknown }
		| Array<{ name: string; getInitialState: () => unknown }> = null,
	State = never
> = T extends string
	? ExtendedRootState<T, State>
	: T extends { name: string; getInitialState: () => unknown }
	? RootStateWithSlice<T>
	: T extends Array<{ name: string; getInitialState: () => unknown }>
	? BaseRootState & MultiplePathsToType<T>
	: BaseRootState;

export const useAppSelector: TypedUseSelectorHook<BaseRootState> = useSelector;

export default store;
