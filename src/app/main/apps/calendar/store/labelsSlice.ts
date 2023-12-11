import { createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import { RootStateType } from 'app/store/types';

type AppRootStateType = RootStateType<labelsSliceType>;

const initialState: {
	selectedLabels: string[];
	labelsDialogOpen: boolean;
	ids: string[];
} = {
	selectedLabels: [],
	labelsDialogOpen: false,
	ids: []
};

/**
 * The CalendarApp labels slice.
 */
export const labelsSlice = createSlice({
	name: 'calendarApp/labels',
	initialState,
	reducers: {
		setSelectedLabels: (state, action) => {
			state.selectedLabels = action.payload as string[];
		},
		toggleSelectedLabels: (state, action) => {
			state.selectedLabels = _.xor(state.selectedLabels, [action.payload]) as string[];
		},
		openLabelsDialog: (state) => {
			state.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state) => {
			state.labelsDialogOpen = false;
		}
	}
});

export const selectSelectedLabels = (state: AppRootStateType) => state.calendarApp.labels?.selectedLabels;

export const selectLabelsDialogOpen = (state: AppRootStateType) => state.calendarApp.labels?.labelsDialogOpen;

export const { toggleSelectedLabels, setSelectedLabels, openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export type labelsSliceType = typeof labelsSlice;

export default labelsSlice.reducer;
