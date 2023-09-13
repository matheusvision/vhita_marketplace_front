import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { GuideModelType } from '../model/GuideModel';

export const getGuide = createAsyncThunk<GuideModelType, { categorySlug: string; guideSlug: string }>(
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

export type AppRootState = RootState<typeof guideSlice>;

export const selectGuide = (state: AppRootState) => state.helpCenterApp.guide;

export default guideSlice.reducer;
