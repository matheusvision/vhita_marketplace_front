import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { ProductType } from '../types/ProductType';
import ProductModel from '../product/models/ProductModel';

export type AppRootStateType = RootStateType<productSliceType>;

/**
 * Get product from server by id
 */
export const getProduct = createAppAsyncThunk<ProductType, string>(
	'eCommerceApp/product/getProduct',
	async (productId) => {
		const response = await axios.get(`/api/ecommerce/products/${productId}`);

		const data = (await response.data) as ProductType;

		return data;
	}
);

/**
 * Remove product
 */
export const removeProduct = createAppAsyncThunk<string, null>(
	'eCommerceApp/product/removeProduct',
	async (_, { getState }) => {
		const AppState = getState() as AppRootStateType;

		const { id } = AppState.eCommerceApp.product;

		await axios.delete(`/api/ecommerce/products/${id}`);

		return id;
	}
);

/**
 * Save product
 */
export const saveProduct = createAppAsyncThunk<ProductType, ProductType>(
	'eCommerceApp/product/saveProduct',
	async (productData, { getState }) => {
		const AppState = getState() as AppRootStateType;

		const { id } = AppState.eCommerceApp.product;

		const response = await axios.put(`/api/ecommerce/products/${id}`, productData);

		const data = (await response.data) as ProductType;

		return data;
	}
);

const initialState: ProductType = null;

/**
 * The E-Commerce product slice.
 */
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

export const selectProduct = (state: AppRootStateType) => state.eCommerceApp.product;

export const { newProduct, resetProduct } = productSlice.actions;

export type productSliceType = typeof productSlice;

export default productSlice;
