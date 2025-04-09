import { createSlice } from '@reduxjs/toolkit';
import { setMetricsFilter } from './metricsFilter.actions.js'
import rootReducer from '@/store/rootReducer';

const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
const formatDate = (date: Date) => date.toISOString().split('T')[0];

const initialState = {
	filter: {
		date_init: formatDate(firstDay),
		date_end: formatDate(today),
		range: 'mensal',
		meta: 'sem_meta'
	}
};
/**
 * The slice for the contacts.
 */
export const metricsFilterAppSlice = createSlice({
	name: 'metricsFilterApp',
	initialState,
	reducers:
	{
		setInitialFilter: (state) => {
			state.filter = initialState.filter;
		}
	}
	,
	extraReducers: (builder) => {
		builder.addCase(setMetricsFilter.fulfilled, (state, action) => {
			state.filter = action.payload
		});

	},
	selectors: {
		filter: (state) => state.filter,
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(metricsFilterAppSlice);
export const { setInitialFilter } = metricsFilterAppSlice.actions;
const injectedSlice = metricsFilterAppSlice.injectInto(rootReducer);
export const { filter } = injectedSlice.selectors;
export default metricsFilterAppSlice.reducer;
