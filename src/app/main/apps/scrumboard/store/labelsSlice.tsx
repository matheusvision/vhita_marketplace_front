import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { LabelsType, LabelType } from '../model/LabelModel';

type DynamicAppRootState = RootState<LabelsSliceType>;

export const getLabels = createAppAsyncThunk<LabelsType, string>('scrumboardApp/labels/getLabels', async (boardId) => {
	const response = await axios.get(`/api/scrumboard/boards/${boardId}/labels`);
	const data = (await response.data) as LabelsType;

	return data;
});

const labelsAdapter = createEntityAdapter<LabelType>({});

export const { selectAll: selectLabels, selectById } = labelsAdapter.getSelectors(
	(state: DynamicAppRootState) => state.scrumboardApp.labels
);

const labelsSlice = createSlice({
	name: 'scrumboardApp/labels',
	initialState: labelsAdapter.getInitialState({}),
	reducers: {
		resetLabels: () => {}
	},
	extraReducers: (builder) => {
		builder.addCase(getLabels.fulfilled, (state, action) => labelsAdapter.setAll(state, action.payload));
	}
});

export const { resetLabels } = labelsSlice.actions;

export const selectLabelById = (id: LabelType['id']) => (state: DynamicAppRootState) => selectById(state, id);

export type LabelsSliceType = typeof labelsSlice;

export default labelsSlice;
