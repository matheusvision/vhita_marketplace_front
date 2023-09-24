import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { LabelModelType } from '../model/LabelModel';

type AppRootState = RootState<labelsSliceType>;

export const getLabels = createAppAsyncThunk('calendarApp/labels/getLabels', async () => {
	const response = await axios.get('/api/calendar/labels');
	const data = (await response.data) as LabelModelType[];

	return data;
});

export const addLabel = createAppAsyncThunk<LabelModelType, LabelModelType>(
	'calendarApp/labels/addLabel',
	async (newLabel) => {
		const response = await axios.post('/api/calendar/labels', newLabel);
		const data = (await response.data) as LabelModelType;

		return data;
	}
);

export const updateLabel = createAppAsyncThunk<LabelModelType, LabelModelType>(
	'calendarApp/labels/updateLabel',
	async (label) => {
		const response = await axios.put(`/api/calendar/labels/${label.id}`, label);
		const data = (await response.data) as LabelModelType;

		return data;
	}
);

export const removeLabel = createAppAsyncThunk<string, string>('calendarApp/labels/removeLabel', async (labelId) => {
	const response = await axios.delete(`/api/calendar/labels/${labelId}`);
	const data = (await response.data) as string;

	return data;
});

const labelsAdapter = createEntityAdapter<LabelModelType>();

const initialState = labelsAdapter.getInitialState<{
	selectedLabels: string[];
	labelsDialogOpen: boolean;
	ids: string[];
}>({
	selectedLabels: [],
	labelsDialogOpen: false,
	ids: []
});

export const {
	selectAll: selectLabels,
	selectIds: selectLabelIds,
	selectById: selectLabelById
} = labelsAdapter.getSelectors((state: AppRootState) => state.calendarApp.labels);

const labelsSlice = createSlice({
	name: 'calendarApp/labels',
	initialState,
	reducers: {
		toggleSelectedLabels: (state, action) => {
			state.selectedLabels = _.xor(state.selectedLabels, [action.payload]) as string[];
		},
		openLabelsDialog: (state) => {
			state.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state) => {
			state.labelsDialogOpen = false;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLabels.fulfilled, (state, action) => {
				labelsAdapter.setAll(state, action.payload);
				state.selectedLabels = action.payload.map((item) => item.id);
			})
			.addCase(addLabel.fulfilled, (state, action) => labelsAdapter.addOne(state, action.payload))
			.addCase(updateLabel.fulfilled, (state, action) => labelsAdapter.upsertOne(state, action.payload))
			.addCase(removeLabel.fulfilled, (state, action) => labelsAdapter.removeOne(state, action.payload));
	}
});

export const selectSelectedLabels = (state: AppRootState) => state.calendarApp.labels?.selectedLabels;
export const selectFirstLabelId = (state: AppRootState) => state.calendarApp.labels?.ids[0];
export const selectLabelsDialogOpen = (state: AppRootState) => state.calendarApp.labels?.labelsDialogOpen;

export const { toggleSelectedLabels, openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export type labelsSliceType = typeof labelsSlice;

export default labelsSlice;
