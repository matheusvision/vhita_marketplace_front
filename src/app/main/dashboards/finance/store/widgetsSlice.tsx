import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import RecentTransactionsWidgetType from '../types/RecentTransactionsWidgetType';
import CurrentStatementWidgetType from '../types/CurrentStatementWidgetType';
import PreviousStatementWidgetType from '../types/PreviousStatementWidgetType';
import BudgetWidgetType from '../types/BudgetWidgetType';
import AccountBalanceWidgetType from '../types/AccountBalanceWidgetType';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	recentTransactions?: RecentTransactionsWidgetType;
	currentStatement?: CurrentStatementWidgetType;
	previousStatement?: PreviousStatementWidgetType;
	budget?: BudgetWidgetType;
	accountBalance?: AccountBalanceWidgetType;
};

export const getWidgets = createAppAsyncThunk('financeDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/finance/widgets');

	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = {};

const widgetsSlice = createSlice({
	name: 'financeDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.financeDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice;
