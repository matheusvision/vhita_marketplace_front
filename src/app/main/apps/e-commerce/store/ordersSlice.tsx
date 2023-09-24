import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { OrderType, OrdersType } from '../order/model/OrderModel';

export type AppRootState = RootState<ordersSliceType>;

export const getOrders = createAppAsyncThunk<OrdersType>('eCommerceApp/orders/getOrders', async () => {
	const response = await axios.get('/api/ecommerce/orders');

	const data = (await response.data) as OrdersType;

	return data;
});

export const removeOrders = createAppAsyncThunk<string[], string[]>(
	'eCommerceApp/orders/removeOrders',
	async (orderIds) => {
		await axios.delete('/api/ecommerce/orders', { data: orderIds });

		return orderIds;
	}
);

const ordersAdapter = createEntityAdapter<OrderType>({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	(state: AppRootState) => state.eCommerceApp.orders
);

const initialState = ordersAdapter.getInitialState({
	searchText: ''
});

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState,
	reducers: {
		setOrdersSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.fulfilled, (state, action) => ordersAdapter.setAll(state, action.payload))
			.addCase(removeOrders.fulfilled, (state, action) => ordersAdapter.removeMany(state, action.payload));
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export const selectOrdersSearchText = (state: AppRootState) => state.eCommerceApp.orders.searchText;

export type ordersSliceType = typeof ordersSlice;

export default ordersSlice;
