import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import BTCWidgetType from '../types/BTCWidgetType';
import PricesType from '../types/PricesType';
import WalletsType from '../types/WalletsType';
import WatchlistType from '../types/WatchlistType';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	btc?: BTCWidgetType;
	prices?: PricesType;
	wallets?: WalletsType;
	watchlist?: WatchlistType;
};

/**
 * Get the widgets data.
 */
export const getWidgets = createAppAsyncThunk<WidgetsType>('cryptoDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/crypto/widgets');

	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = null;

/**
 * the crypto dashboard widgets slice.
 */
const widgetsSlice = createSlice({
	name: 'cryptoDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.cryptoDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice;
