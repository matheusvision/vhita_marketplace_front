import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';

type ProjectType = {
	id: number;
	name: string;
};

type ProjectDashboardAppState = {
	projects?: ReturnType<typeof projectsAdapter.getInitialState>;
};

type ExtendedRootState = RootState & {
	projectDashboardApp: ProjectDashboardAppState;
};

export const getProjects = createAppAsyncThunk('projectDashboardApp/projects/getProjects', async () => {
	const response = await axios.get('/api/dashboards/project/projects');

	const data = (await response.data) as ProjectType[];

	return data;
});

const projectsAdapter = createEntityAdapter<ProjectType>();

const initialState = projectsAdapter.getInitialState();

export const {
	selectAll: selectProjects,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = projectsAdapter.getSelectors((state: ExtendedRootState) => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
	name: 'projectDashboardApp/projects',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProjects.fulfilled, (state, action) => projectsAdapter.setAll(state, action.payload));
	}
});

export default projectsSlice.reducer;
