import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		// eslint-disable-next-line global-require
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares: any = [];

if (process.env.NODE_ENV === 'development') {
	// eslint-disable-next-line global-require
	const { createLogger } = require(`redux-logger`);
	const logger = createLogger({ collapsed: (getState: any, action: any, logEntry: any) => !logEntry.error });

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

const asyncReducers = {};

export const injectReducer = (key: any, reducer: any) => {
	if (asyncReducers[key]) {
		return false;
	}
	asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(asyncReducers));
	return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
