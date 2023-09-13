import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import { ProductType, ProductsType } from '../product/model/ProductModel';

export const getProducts = createAppAsyncThunk<ProductsType>('eCommerceApp/products/getProducts', async () => {
	const response = await axios.get('/api/ecommerce/products');
	const data = (await response.data) as ProductsType;

	return data;
});

export const removeProducts = createAppAsyncThunk<string[], string[]>('eCommerceApp/products', async (productIds) => {
	await axios.delete('/api/ecommerce/products', { data: productIds });

	return productIds;
});

const productsAdapter = createEntityAdapter<ProductType>({});

export type AppRootState = RootState<typeof productsSlice>;

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	(state: AppRootState) => state.eCommerceApp.products
);

const initialState = productsAdapter.getInitialState({
	searchText: ''
});

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState,
	reducers: {
		setProductsSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				productsAdapter.setAll(state, action.payload);
				state.searchText = '';
			})
			.addCase(removeProducts.fulfilled, (state, action) => {
				productsAdapter.removeMany(state, action.payload);
			});
		// You can add more cases here similar to the provided example, e.g. removeProducts
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = (state: AppRootState) => state.eCommerceApp.products.searchText;

export default productsSlice.reducer;
