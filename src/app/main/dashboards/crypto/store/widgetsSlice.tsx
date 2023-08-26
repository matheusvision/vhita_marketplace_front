import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import BTCWidgetType from '../types/BTCWidgetType';
import PricesType from '../types/PricesType';
import WalletsType from '../types/WalletsType';
import WatchlistType from '../types/WatchlistType';

type WidgetsType = {
	btc?: BTCWidgetType;
	prices?: PricesType;
	wallets?: WalletsType;
	watchlist?: WatchlistType;
};

type CryptoDashboardAppState = {
	widgets?: WidgetsType;
};

type ExtendedRootState = RootState & {
	cryptoDashboardApp: CryptoDashboardAppState;
};

export const getWidgets = createAppAsyncThunk('cryptoDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/crypto/widgets');

	const data = (await response.data) as CryptoDashboardAppState;

	return data;
});

const initialState: CryptoDashboardAppState = null;

const widgetsSlice = createSlice({
	name: 'cryptoDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: ExtendedRootState) => state.cryptoDashboardApp.widgets;

export default widgetsSlice.reducer;
