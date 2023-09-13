import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { RootState } from 'app/store/index';
import { selectFaqCategories } from './faqCategoriesSlice';
import { FaqModelType, FaqsModelType } from '../model/FaqModel';

export const getFaqs = createAsyncThunk<FaqsModelType>('helpCenterApp/faqs/getFaqs', async () => {
	const response = await axios.get('api/help-center/faqs');

	const data = (await response.data) as FaqsModelType;

	return data;
});

const faqsAdapter = createEntityAdapter<FaqModelType>({});

export const { selectAll: selectFaqs, selectById: selectFaqById } = faqsAdapter.getSelectors(
	(state: AppRootState) => state.helpCenterApp.faqs
);

const initialState = faqsAdapter.getInitialState();

const faqsSlice = createSlice({
	name: 'helpCenterApp/faqs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFaqs.fulfilled, (state, action) => faqsAdapter.setAll(state, action.payload));
	}
});

export type AppRootState = RootState<typeof faqsSlice>;

export const selectGroupedFaqs = createSelector([selectFaqs, selectFaqCategories], (faqs, categories) => {
	return categories.map((category) => ({
		...category,
		faqs: _.filter(faqs, { categoryId: category.id })
	}));
});

export default faqsSlice.reducer;
