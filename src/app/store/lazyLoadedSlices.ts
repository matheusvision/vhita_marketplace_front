import { Slice, combineSlices } from '@reduxjs/toolkit';
import { fuseSettingsSlice } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { i18nSlice } from 'app/store/i18nSlice';
import apiService from './apiService';
import { userSlice } from '../auth/user/store/userSlice';

// eslint-disable-next-line
// @ts-expect-error
export interface LazyLoadedSlices {}

/**
 * The static reducers.
 */
const staticSlices: Slice[] = [userSlice, fuseSettingsSlice, i18nSlice];

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(...staticSlices, {
	[apiService.reducerPath]: apiService.reducer
}).withLazyLoadedSlices<LazyLoadedSlices>();
