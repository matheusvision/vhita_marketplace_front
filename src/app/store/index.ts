import { configureStore, ThunkAction, ThunkDispatch, Action, Reducer, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { createLogger } from 'redux-logger';
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

export type RootState = ReturnType<typeof store.getState>;

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

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type PathToType<Str extends string, T> = Str extends `${infer Start}/${infer Rest}`
	? { [P in Start as P]: PathToType<Rest, T> }
	: { [P in Str]: T };

export type RootStateWith<SliceType extends { name: string; getInitialState: () => unknown }> = RootState &
	PathToType<SliceType['name'], ReturnType<SliceType['getInitialState']>>;

export default store;
