import { createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import axios from 'axios';
import { OrderType } from '../order/model/OrderModel';

export type AppRootState = RootState<orderSliceType>;

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

export const selectOrder = (state: AppRootState) => state.eCommerceApp.order;

export type orderSliceType = typeof orderSlice;

export default orderSlice;
