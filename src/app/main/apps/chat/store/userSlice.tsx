import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { RootStateType } from 'app/store/types';
import { PartialDeep } from 'type-fest';
import { UserType } from '../types/UserType';

type AppRootStateType = RootStateType<userSliceType>;

/**
 * Get user data
 */
export const getUserData = createAppAsyncThunk<UserType>('chatApp/user/getUserData', async () => {
	const response = await axios.get('/api/chat/user');

	const data = (await response.data) as UserType;

	return data;
});

/**
 * Update user data
 */
export const updateUserData = createAppAsyncThunk<UserType, DeepPartial<UserType>>(
	'chatApp/user/updateUserData',
	async (newData) => {
		const response = await axios.post('/api/chat/user', newData);

		const data = (await response.data) as UserType;

		return data;
	}
);

const initialState: PartialDeep<UserType> = {};

/**
 * Chat App User Slice
 */
const userSlice = createSlice({
	name: 'chatApp/user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.fulfilled, (state, action) => action.payload)
			.addCase(updateUserData.fulfilled, (state, action) => action.payload);
	}
});

export const selectUser = (state: AppRootStateType) => state.chatApp.user;

export type userSliceType = typeof userSlice;

export default userSlice;
