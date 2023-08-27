import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import CategoryType from '../types/CategoryType';

export const getCategories = createAppAsyncThunk('academyApp/categories/getCategories', async () => {
	const response = await axios.get('/api/academy/categories');

	const data = (await response.data) as CategoryType[];

	return data;
});

const categoriesAdapter = createEntityAdapter<CategoryType>();

const initialState = categoriesAdapter.getInitialState();

export const { selectAll: selectCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
	(state: AppRootState) => state.academyApp.categories
);

const categorySlice = createSlice({
	name: 'academyApp/categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategories.fulfilled, (state, action) => categoriesAdapter.setAll(state, action.payload));
	}
});

type AppRootState = RootState<typeof categorySlice>;

export default categorySlice.reducer;
