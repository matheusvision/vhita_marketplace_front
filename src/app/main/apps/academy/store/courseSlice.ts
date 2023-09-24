import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { PartialDeep } from 'type-fest';
import CourseType from '../types/CourseType';

type AppRootState = RootState<CourseSliceType>;

export const getCourse = createAppAsyncThunk('academyApp/course/getCourse', async (courseId: string) => {
	const response = await axios.get(`/api/academy/courses/${courseId}`);

	const data = (await response.data) as CourseType;

	return data;
});

export const updateCourse = createAppAsyncThunk<CourseType, PartialDeep<CourseType>>(
	'academyApp/course/updateCourse',
	async (_data, { getState, dispatch }) => {
		const AppState = getState() as AppRootState;
		const { id } = AppState.academyApp.course;

		const response = await axios.put(`/api/academy/courses/${id}`, _data);

		const data = (await response.data) as CourseType;

		dispatch(showMessage({ message: 'Course Saved' }));

		return data;
	}
);

const initialState: CourseType = null;

const courseSlice = createSlice({
	name: 'academyApp/course',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCourse.fulfilled, (state, action) => action.payload);
		builder.addCase(updateCourse.fulfilled, (state, action) => action.payload);
	}
});

export const selectCourse = (state: AppRootState) => state.academyApp.course;

export type CourseSliceType = typeof courseSlice;

export default courseSlice;
