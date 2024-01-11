import fuse from 'app/store/fuse';
import i18n from 'app/store/i18nSlice';
import apiService from 'app/store/apiService';
import {
	ReducersMapObject,
	configureStore,
	Store,
	combineSlices,
	buildCreateSlice,
	asyncThunkCreator,
	createAsyncThunk
} from '@reduxjs/toolkit';
import { createDynamicMiddleware } from '@reduxjs/toolkit/react';
import { AppDispatchType } from 'app/store/types';
import user from '../auth/user/userSlice';
import store from '.';

/**
 * The dynamic middleware instance.
 */
const dynamicInstance = createDynamicMiddleware();

export const { middleware: dynamicMiddleware } = dynamicInstance;

export const addAppMiddleware = dynamicInstance.addMiddleware.withTypes<Config>();

/**
 * The type definition for the lazy loaded slices.
 */
export interface LazyLoadedSlices {}

/**
 * The static reducers.
 */
const staticReducers: ReducersMapObject = {
	fuse,
	i18n,
	user,
	[apiService.reducerPath]: apiService.reducer
};

/**
 * The root reducer.
 */
export const rootReducer = combineSlices(staticReducers).withLazyLoadedSlices<LazyLoadedSlices>();

/**
 * The type definition for the root state.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Configures the app store.
 */
export function configureAppStore(initialState?: RootState) {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiService.middleware).concat(dynamicMiddleware)
	}) as Store<RootState>;

	return store;
}

/**
 * The type definition for the app store.
 */
export type AppStore = typeof store;

/**
 * The type definition for the app dispatch.
 */
export type AppDispatch = AppStore['dispatch'];

/**
 * Shortage for the root state selector.
 */
export const appSelector = rootReducer.selector;

/**
 * createAppSlice is a wrapper around createSlice that adds support for asyncThunkCreator.
 */
export const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});

/**
 * The type definition for the config object passed to `withAppMiddleware`.
 */
type Config = {
	state: RootState;
	dispatch: AppDispatch;
};

export const withAppMiddleware = dynamicInstance.withMiddleware.withTypes<Config>();
