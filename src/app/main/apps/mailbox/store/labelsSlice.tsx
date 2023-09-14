import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { LabelType, LabelsType } from '../model/LabelModel';

export const getLabels = createAppAsyncThunk<LabelsType>('mailboxApp/labels/getLabels', async () => {
	const response = await axios.get('/api/mailbox/labels');

	const data = (await response.data) as LabelsType;

	return data;
});

const labelsAdapter = createEntityAdapter<LabelType>({});

const initialState = labelsAdapter.getInitialState();

export const {
	selectAll: selectLabels,
	selectEntities: selectLabelsEntities,
	selectById
} = labelsAdapter.getSelectors((state: AppRootState) => state.mailboxApp.labels);

const labelsSlice = createSlice({
	name: 'mailboxApp/labels',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLabels.fulfilled, (state, action) => labelsAdapter.setAll(state, action.payload));
	}
});

export const selectLabelById = (id: string) => (state: AppRootState) => selectById(state, id);

export type AppRootState = RootState<typeof labelsSlice>;

export default labelsSlice.reducer;
