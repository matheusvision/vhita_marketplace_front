import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import CourseType from '../types/CourseType';

type AppRootState = RootState<CoursesSliceType>;

export const getCourses = createAppAsyncThunk('academyApp/courses/getCourses', async () => {
	const response = await axios.get('/api/academy/courses');

	const data = (await response.data) as CourseType[];

	return data;
});

const coursesAdapter = createEntityAdapter<CourseType>({});

const initialState = coursesAdapter.getInitialState();

export const { selectAll: selectCourses, selectById: selectCourseById } = coursesAdapter.getSelectors(
	(state: AppRootState) => state.academyApp.courses
);

const coursesSlice = createSlice({
	name: 'academyApp/courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCourses.fulfilled, (state, action) => coursesAdapter.setAll(state, action.payload));
	}
});

export type CoursesSliceType = typeof coursesSlice;

export default coursesSlice;
