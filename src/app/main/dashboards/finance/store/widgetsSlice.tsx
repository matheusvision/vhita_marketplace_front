import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import RecentTransactionsWidgetType from '../types/RecentTransactionsWidgetType';
import CurrentStatementWidgetType from '../types/CurrentStatementWidgetType';
import PreviousStatementWidgetType from '../types/PreviousStatementWidgetType';
import BudgetWidgetType from '../types/BudgetWidgetType';
import AccountBalanceWidgetType from '../types/AccountBalanceWidgetType';

type WidgetsType = {
	recentTransactions?: RecentTransactionsWidgetType;
	currentStatement?: CurrentStatementWidgetType;
	previousStatement?: PreviousStatementWidgetType;
	budget?: BudgetWidgetType;
	accountBalance?: AccountBalanceWidgetType;
};

type FinanceDashboardAppState = {
	widgets?: WidgetsType;
};

type ExtendedRootState = RootState & {
	financeDashboardApp: FinanceDashboardAppState;
};

export const getWidgets = createAppAsyncThunk('financeDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/finance/widgets');

	const data = (await response.data) as WidgetsType;

	return data;
});

const widgetsSlice = createSlice({
	name: 'financeDashboardApp/widgets',
	initialState: null,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: ExtendedRootState) => state.financeDashboardApp.widgets;

export default widgetsSlice.reducer;
