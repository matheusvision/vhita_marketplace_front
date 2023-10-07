import { configureStore, Reducer, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { createLogger } from 'redux-logger';
import _ from '@lodash';
import createReducer from './rootReducer';
import { AppDispatchType, AsyncReducersType, BaseRootStateType } from './types';

/* if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		// eslint-disable-next-line global-require
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
} */

/**
 * Configures the middleware which are used during the React application lifecycle.
 *
 * @param {object} config Configuration object
 * @param {object} config.env Environment configuration values
 */
const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });

	middlewares.push(logger);
}

/**
 * Configures the application's store by calling `configureStore` with an object of settings.
 *
 * @param {object} settings The settings for the store.
 * @param {function} settings.reducer The reducer function for the store.
 * @param {function} settings.middleware The middleware functions for the store.
 * @param {boolean} settings.devTools Flag for enabling the DevTools extension.
 * @returns {object} The store object.
 */
const store = configureStore({
	reducer: createReducer({}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

/**
 * The type of an object containing async reducers.
 */
const asyncReducers: AsyncReducersType = {};

/**
 * injects a single reducer to the store
 *
 * @param {String} key - unique identifier to register the reducer in asyncReducers
 * @param {Reducer} reducer - reducer function
 *
 * @returns {boolean} false if the reducer already exists or store object
 */
export const injectReducer = (key: string, reducer: Reducer) => {
	if (asyncReducers[key]) {
		return false;
	}

	asyncReducers[key] = reducer;

	store.replaceReducer(createReducer(asyncReducers));

	return store;
};

/**
injects reducers to the store in bulk
@param {ReducersMapObject} reducers - object containing reducers to inject
@returns {Store} the store object
 */
export const injectReducers = (reducers: ReducersMapObject) => {
	store.replaceReducer(createReducer(_.merge(asyncReducers, reducers)));

	return store;
};

/**
 * Typed hook to get the dispatch function from the Redux store.
 */
export const useAppDispatch: () => AppDispatchType = useDispatch;

/**
 * Typed hook to get a slice of the Redux store state.
 * @template T - The type of the slice of state to retrieve.
 * @param selector - A function that takes the root state and returns the desired slice of state.
 * @returns The selected slice of state.
 */
export const useAppSelector: TypedUseSelectorHook<BaseRootStateType> = useSelector;

export default store;
