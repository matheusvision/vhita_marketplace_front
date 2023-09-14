import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { FaqModelType, FaqsModelType } from '../model/FaqModel';

export const getFaqsMost = createAppAsyncThunk<FaqsModelType>('helpCenterApp/faqsMost/get', async () => {
	const response = await axios.get('/api/help-center/faqs/most-asked');

	const data = (await response.data) as FaqsModelType;

	return data;
});

const faqsMostAdapter = createEntityAdapter<FaqModelType>({});

export const { selectAll: selectFaqsMost, selectById: selectFaqsMostById } = faqsMostAdapter.getSelectors(
	(state: AppRootState) => state.helpCenterApp.faqsMost
);

const faqsMostSlice = createSlice({
	name: 'helpCenterApp/faqsMost',
	initialState: faqsMostAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFaqsMost.fulfilled, (state, action) => faqsMostAdapter.setAll(state, action.payload));
	}
});

export type AppRootState = RootState<typeof faqsMostSlice>;

export default faqsMostSlice.reducer;
