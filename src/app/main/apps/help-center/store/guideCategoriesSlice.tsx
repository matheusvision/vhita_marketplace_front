import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { RootState } from 'app/store/index';
import { GuideCategoriesType, GuideCategoryType } from '../model/GuideCategoryModel';

export const getGuideCategories = createAsyncThunk<GuideCategoriesType>(
	'helpCenterApp/guideCategories/get',
	async () => {
		const response = await axios.get('api/help-center/guides/categories');
		const data = (await response.data) as GuideCategoriesType;

		return data;
	}
);

const guideCategoriesAdapter = createEntityAdapter<GuideCategoryType>({});

export const { selectAll: selectGuideCategories, selectById: selectGuideCategorieseById } =
	guideCategoriesAdapter.getSelectors((state: AppRootState) => state.helpCenterApp.guideCategories);

const initialState = guideCategoriesAdapter.getInitialState();

const guideCategoriesSlice = createSlice({
	name: 'helpCenterApp/guideCategories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getGuideCategories.fulfilled, (state, action) =>
			guideCategoriesAdapter.setAll(state, action.payload)
		);
	}
});

export type AppRootState = RootState<typeof guideCategoriesSlice>;

export const selectGuideCategorieseBySlug = (slug: GuideCategoryType['slug']) =>
	createSelector([selectGuideCategories], (categories) => {
		return _.find(categories, { slug });
	});

export default guideCategoriesSlice.reducer;
