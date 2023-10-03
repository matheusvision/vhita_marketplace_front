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

export const useAppDispatch: () => AppDispatchType = useDispatch;

export const useAppSelector: TypedUseSelectorHook<BaseRootStateType> = useSelector;

export default store;
