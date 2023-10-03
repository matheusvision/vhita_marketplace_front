import { createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import axios from 'axios';
import { OrderType } from '../types/OrderType';

export type AppRootStateType = RootStateType<orderSliceType>;

export const getOrder = createAppAsyncThunk('eCommerceApp/order/getOrder', async (orderId: string) => {
	const response = await axios.get(`/api/ecommerce/orders/${orderId}`);

	const data = (await response.data) as OrderType;

	return data || null;
});

export const saveOrder = createAppAsyncThunk('eCommerceApp/order/saveOrder', async (order: OrderType) => {
	const response = await axios.put('/api/ecommerce/orders', order);

	const data = (await response.data) as OrderType;

	return data;
});

const orderSlice = createSlice({
	name: 'eCommerceApp/order',
	initialState: null as OrderType | null,
	reducers: {
		resetOrder: () => null
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrder.fulfilled, (state, action) => action.payload)
			.addCase(saveOrder.fulfilled, (state, action) => action.payload);
	}
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state: AppRootStateType) => state.eCommerceApp.order;

export type orderSliceType = typeof orderSlice;

export default orderSlice;
