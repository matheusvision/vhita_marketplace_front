import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { PartialDeep } from 'type-fest';
import SectionModel from '../models/SectionModel';
import TaskModel from '../models/TaskModel';
import { TaskType } from '../types/TaskType';

export type AppRootStateType = RootStateType<taskSliceType>;

export const getTask = createAppAsyncThunk<TaskType, string>('tasksApp/task/getTask', async (id) => {
	try {
		const response = await axios.get(`/api/tasks/${id}`);

		const data = (await response.data) as TaskType;

		return data;
	} catch (error) {
		history.push({ pathname: `/apps/tasks` });

		return null;
	}
});

export const addTask = createAppAsyncThunk<TaskType, PartialDeep<TaskType>>('tasksApp/tasks/addTask', async (task) => {
	const response = await axios.post('/api/tasks', task);

	const data = (await response.data) as TaskType;

	return data;
});

export const updateTask = createAppAsyncThunk<TaskType, TaskType>('tasksApp/tasks/updateTask', async (task) => {
	const response = await axios.put(`/api/tasks/${task.id}`, task);

	const data = (await response.data) as TaskType;

	return data;
});

export const removeTask = createAppAsyncThunk<string, string>('tasksApp/tasks/removeTask', async (id) => {
	const response = await axios.delete(`/api/tasks/${id}`);

	await response.data;

	return id;
});

const initialState: TaskType = null;

const taskSlice = createSlice({
	name: 'tasksApp/task',
	initialState,
	reducers: {
		newTask: (state, action) => {
			const type = action.payload as TaskType['type'];

			if (type === 'section') {
				return SectionModel({});
			}
			if (type === 'task') {
				return TaskModel({});
			}
			return null;
		},
		resetTask: () => null
	},

	extraReducers: (builder) => {
		builder
			.addCase(getTask.pending, () => null)
			.addCase(getTask.fulfilled, (state, action) => action.payload)
			.addCase(addTask.fulfilled, (state, action) => action.payload)
			.addCase(updateTask.fulfilled, (state, action) => action.payload)
			.addCase(removeTask.fulfilled, () => null);
	}
});

export const selectTask = (state: AppRootStateType) => state.tasksApp.task;

export const { resetTask, newTask } = taskSlice.actions;

export type taskSliceType = typeof taskSlice;

export default taskSlice;
