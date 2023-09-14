import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { FaqCategoriesType, FaqCategoryType } from '../model/FaqCategoryModel';

export const getFaqCategories = createAppAsyncThunk<FaqCategoriesType>('helpCenterApp/faqCategories/get', async () => {
	const response = await axios.get('api/help-center/faqs/categories');

	const data = (await response.data) as FaqCategoriesType;

	return data;
});

const faqCategoriesAdapter = createEntityAdapter<FaqCategoryType>({});

export const { selectAll: selectFaqCategories, selectById: selectFaqCategoryById } = faqCategoriesAdapter.getSelectors(
	(state: AppRootState) => state.helpCenterApp.faqCategories
);
const initialState = faqCategoriesAdapter.getInitialState();

const faqCategoriesSlice = createSlice({
	name: 'helpCenterApp/faqCategories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFaqCategories.fulfilled, (state, action) =>
			faqCategoriesAdapter.setAll(state, action.payload)
		);
	}
});

export type AppRootState = RootState<typeof faqCategoriesSlice>;

export default faqCategoriesSlice.reducer;
