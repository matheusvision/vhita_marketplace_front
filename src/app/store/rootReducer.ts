import { combineReducers, ReducersMapObject } from '@reduxjs/toolkit';
import apiService from './apiService';
// import user from './user/userSlice';
import i18n from './i18nSlice';
import fuse from './fuse';

/**
 * Creates a reducer function that combines the provided reducers with the async reducers.
 */
const createReducer = (asyncReducers: ReducersMapObject) =>
	combineReducers({
		fuse,
		// user,
		i18n,
		[apiService.reducerPath]: apiService.reducer,
		...asyncReducers
	} as ReducersMapObject);

export default createReducer;
