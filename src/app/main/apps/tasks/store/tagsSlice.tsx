import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { TagsType } from '../model/TagModel';

export const getTags = createAppAsyncThunk('tasksApp/tags/getTags', async () => {
	const response = await axios.get('/api/tasks/tags');

	const data = (await response.data) as TagsType;

	return data;
});

const tagsAdapter = createEntityAdapter({});
const initialState = tagsAdapter.getInitialState([]);

export const { selectAll: selectTags, selectById: selectTagsById } = tagsAdapter.getSelectors(
	(state: AppRootState) => state.tasksApp.tags
);

const tagsSlice = createSlice({
	name: 'tasksApp/tags',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTags.fulfilled, (state, action) => {
			tagsAdapter.setAll(state, action.payload);
		});
	}
});

export type AppRootState = RootState<typeof tagsSlice>;

export default tagsSlice.reducer;
