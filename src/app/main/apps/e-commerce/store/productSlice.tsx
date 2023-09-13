import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import ProductModel, { ProductType } from '../product/model/ProductModel';

export const getProduct = createAppAsyncThunk<ProductType, string>(
	'eCommerceApp/product/getProduct',
	async (productId) => {
		const response = await axios.get(`/api/ecommerce/products/${productId}`);

		const data = (await response.data) as ProductType;

		return data;
	}
);

export const removeProduct = createAppAsyncThunk<string, null>(
	'eCommerceApp/product/removeProduct',
	async (_, { getState }) => {
		const AppState = getState() as AppRootState;

		const { id } = AppState.eCommerceApp.product;

		await axios.delete(`/api/ecommerce/products/${id}`);

		return id;
	}
);

export const saveProduct = createAppAsyncThunk<ProductType, ProductType>(
	'eCommerceApp/product/saveProduct',
	async (productData, { getState }) => {
		const AppState = getState() as AppRootState;

		const { id } = AppState.eCommerceApp.product;

		const response = await axios.put(`/api/ecommerce/products/${id}`, productData);

		const data = (await response.data) as ProductType;

		return data;
	}
);

const initialState: ProductType = null;

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState,
	reducers: {
		resetProduct: () => null,
		newProduct: () => ProductModel({})
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProduct.fulfilled, (state, action) => action.payload)
			.addCase(saveProduct.fulfilled, (state, action) => action.payload)
			.addCase(removeProduct.fulfilled, () => null);
	}
});

export type AppRootState = RootState<typeof productSlice>;

export const selectProduct = (state: AppRootState) => state.eCommerceApp.product;

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
