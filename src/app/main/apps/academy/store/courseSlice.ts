import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { PartialDeep } from 'type-fest';
import CourseType from '../types/CourseType';

type AppRootStateType = RootStateType<CourseSliceType>;

/**
 * Gets the course.
 */
export const getCourse = createAppAsyncThunk('academyApp/course/getCourse', async (courseId: string) => {
	const response = await axios.get(`/api/academy/courses/${courseId}`);

	const data = (await response.data) as CourseType;

	return data;
});

/**
 * Updates the course.
 */
export const updateCourse = createAppAsyncThunk<CourseType, PartialDeep<CourseType>>(
	'academyApp/course/updateCourse',
	async (_data, { getState, dispatch }) => {
		const AppState = getState() as AppRootStateType;
		const { id } = AppState.academyApp.course;

		const response = await axios.put(`/api/academy/courses/${id}`, _data);

		const data = (await response.data) as CourseType;

		dispatch(showMessage({ message: 'Course Saved' }));

		return data;
	}
);

const initialState: CourseType = null;

/**
 * The Academy App course slice.
 */
const courseSlice = createSlice({
	name: 'academyApp/course',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCourse.fulfilled, (state, action) => action.payload);
		builder.addCase(updateCourse.fulfilled, (state, action) => action.payload);
	}
});

export const selectCourse = (state: AppRootStateType) => state.academyApp.course;

export type CourseSliceType = typeof courseSlice;

export default courseSlice;
