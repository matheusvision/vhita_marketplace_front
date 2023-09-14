import { createAppAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLabels = createAppAsyncThunk('notesApp/labels/getLabels', async () => {
	const response = await axios.get('/api/notes/labels');
	const data = await response.data;

	return data;
});

export const createLabel = createAppAsyncThunk('notesApp/labels/createLabel', async (label) => {
	const response = await axios.post(`/api/notes/labels`, label);
	const data = await response.data;

	return data;
});

export const updateLabel = createAppAsyncThunk('notesApp/labels/updateLabel', async (label) => {
	const response = await axios.put(`/api/notes/labels/${label.id}`, label);
	const data = await response.data;

	return data;
});

export const removeLabel = createAppAsyncThunk('notesApp/labels/removeLabel', async (id) => {
	const response = await axios.delete(`/api/notes/labels/${id}`);
	const data = await response.data;

	return data;
});

const labelsAdapter = createEntityAdapter({});

export const {
	selectAll: selectLabels,
	selectEntities: selectLabelsEntities,
	selectById: selectLabelById
} = labelsAdapter.getSelectors((state) => state.notesApp.labels);

const labelsSlice = createSlice({
	name: 'notesApp/labels',
	initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
	reducers: {
		openLabelsDialog: (state, action) => {
			state.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state, action) => {
			state.labelsDialogOpen = false;
		}
	},
	extraReducers: {
		[getLabels.fulfilled]: labelsAdapter.setAll,
		[updateLabel.fulfilled]: labelsAdapter.upsertOne,
		[removeLabel.fulfilled]: labelsAdapter.removeOne,
		[createLabel.fulfilled]: labelsAdapter.addOne
	}
});

export const { openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export const selectLabelsDialogOpen = ({ notesApp }) => notesApp.labels.labelsDialogOpen;

export default labelsSlice.reducer;
