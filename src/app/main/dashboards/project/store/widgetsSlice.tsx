import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import WidgetDataType from '../types/WidgetDataType';
import GithubIssuesDataType from '../types/GithubIssuesDataType';
import TaskDistributionDataType from '../types/TaskDistributionDataType';
import ScheduleDataType from '../types/ScheduleDataType';
import BudgetDistributionDataType from '../types/BudgetDistributionDataType';
import ExpensesDataType from '../types/ExpensesDataType';
import BudgetDetailsDataType from '../types/BudgetDetailsDataType';
import TeamMemberType from '../types/TeamMemberType';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	summary: WidgetDataType;
	overdue: WidgetDataType;
	issues: WidgetDataType;
	features: WidgetDataType;
	githubIssues: GithubIssuesDataType;
	taskDistribution: TaskDistributionDataType;
	schedule: ScheduleDataType;
	budgetDistribution: BudgetDistributionDataType;
	weeklyExpenses: ExpensesDataType;
	monthlyExpenses: ExpensesDataType;
	yearlyExpenses: ExpensesDataType;
	budgetDetails: BudgetDetailsDataType;
	teamMembers: TeamMemberType[];
};

export const getWidgets = createAppAsyncThunk('projectDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/project/widgets');
	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = null;

const widgetsSlice = createSlice({
	name: 'projectDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.projectDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice;
