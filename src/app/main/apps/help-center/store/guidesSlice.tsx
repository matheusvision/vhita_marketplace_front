import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { RootState } from 'app/store/index';
import { selectGuideCategories } from './guideCategoriesSlice';
import { GuideModelType, GuidesModelType } from '../model/GuideModel';

export const getGuides = createAsyncThunk<GuidesModelType, string | void>(
	'helpCenterApp/guides/getGuides',
	async (categorySlug) => {
		const url = categorySlug ? `/api/help-center/guides/${categorySlug}` : '/api/help-center/guides';

		const response = await axios.get(url);

		const data = (await response.data) as GuidesModelType;

		return data;
	}
);

const guidesAdapter = createEntityAdapter<GuideModelType>({});

export const { selectAll: selectGuides, selectById: selectGuideById } = guidesAdapter.getSelectors(
	(state: AppRootState) => state.helpCenterApp.guides
);

const guidesSlice = createSlice({
	name: 'helpCenterApp/guides',
	initialState: guidesAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getGuides.fulfilled, (state, action) => guidesAdapter.setAll(state, action.payload));
	}
});

export type AppRootState = RootState<typeof guidesSlice>;

export const selectGroupedGuides = createSelector([selectGuides, selectGuideCategories], (guides, categories) => {
	return categories.map((category) => ({
		...category,
		guides: _.filter(guides, { categoryId: category.id })
	}));
});

export default guidesSlice.reducer;
