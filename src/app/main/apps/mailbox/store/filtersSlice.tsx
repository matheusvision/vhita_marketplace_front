import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import { FilterType, FiltersType } from '../model/FilterModel';

export const getFilters = createAppAsyncThunk<FiltersType>('mailboxApp/filters/getFilters', async () => {
	const response = await axios.get('/api/mailbox/filters');

	const data = (await response.data) as FiltersType;

	return data;
});

const filtersAdapter = createEntityAdapter<FilterType>({});

export const { selectAll: selectFilters, selectById: selectFilterById } = filtersAdapter.getSelectors(
	(state: AppRootState) => state.mailboxApp.filters
);

const filtersSlice = createSlice({
	name: 'mailboxApp/filters',
	initialState: filtersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFilters.fulfilled, (state, action) => filtersAdapter.setAll(state, action.payload));
	}
});

export type AppRootState = RootState<typeof filtersSlice>;

export default filtersSlice.reducer;
