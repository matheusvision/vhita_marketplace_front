import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { GuideModelType } from '../model/GuideModel';

export type AppRootState = RootState<guideSliceType>;

export const getGuide = createAppAsyncThunk<GuideModelType, { categorySlug: string; guideSlug: string }>(
	'helpCenterApp/guide/get',
	async ({ categorySlug, guideSlug }) => {
		const response = await axios.get(`/api/help-center/guides/${categorySlug}/${guideSlug}`);

		const data = (await response.data) as GuideModelType;

		return data;
	}
);

const initialState: GuideModelType = null;

const guideSlice = createSlice({
	name: 'helpCenterApp/guide',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getGuide.fulfilled, (state, action) => action.payload);
	}
});

export const selectGuide = (state: AppRootState) => state.helpCenterApp.guide;

export type guideSliceType = typeof guideSlice;

export default guideSlice;
