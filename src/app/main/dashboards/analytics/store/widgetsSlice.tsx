import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import ConversionsWidgetType from '../types/ConversionsWidgetType';
import GenderWidgetType from '../types/GenderWidgetType';
import ImpressionsWidgetType from '../types/ImpressionsWidgetType';
import LanguageWidgetType from '../types/LanguageWidgetType';
import NewVsReturningWidgetType from '../types/NewVsReturningWidgetType';
import VisitorsOverviewWidgetType from '../types/VisitorsOverviewWidgetType';
import VisitorsVsPageViewsType from '../types/VisitorsVsPageViewsType';
import VisitsWidgetType from '../types/VisitsWidgetType';
import AgeWidgetType from '../types/AgeWidgetType';

export type WidgetsType = {
	age?: AgeWidgetType;
	conversions?: ConversionsWidgetType;
	gender?: GenderWidgetType;
	impressions?: ImpressionsWidgetType;
	language?: LanguageWidgetType;
	newVsReturning?: NewVsReturningWidgetType;
	visitors?: VisitorsOverviewWidgetType;
	visitorsVsPageViews?: VisitorsVsPageViewsType;
	visits?: VisitsWidgetType;
};

type AnalyticsDashboardAppState = {
	widgets?: WidgetsType;
};

type ExtendedRootState = RootState & {
	analyticsDashboardApp: AnalyticsDashboardAppState;
};

export const getWidgets = createAppAsyncThunk('analyticsDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/dashboards/analytics/widgets');

	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = {};

const widgetsSlice = createSlice({
	name: 'analyticsDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: ExtendedRootState) => state.analyticsDashboardApp.widgets;

export default widgetsSlice.reducer;
