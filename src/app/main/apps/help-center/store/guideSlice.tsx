import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { GuideType } from '../types/GuideType';

export type AppRootStateType = RootStateType<guideSliceType>;

export const getGuide = createAppAsyncThunk<GuideType, { categorySlug: string; guideSlug: string }>(
	'helpCenterApp/guide/get',
	async ({ categorySlug, guideSlug }) => {
		const response = await axios.get(`/api/help-center/guides/${categorySlug}/${guideSlug}`);

		const data = (await response.data) as GuideType;

		return data;
	}
);

const initialState: GuideType = null;

const guideSlice = createSlice({
	name: 'helpCenterApp/guide',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getGuide.fulfilled, (state, action) => action.payload);
	}
});

export const selectGuide = (state: AppRootStateType) => state.helpCenterApp.guide;

export type guideSliceType = typeof guideSlice;

export default guideSlice;
