import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { RootState } from 'app/store/index';
import { PartialDeep } from 'type-fest';
import { UserModelType } from '../model/UserModel';

type AppRootState = RootState<userSliceType>;

export const getUserData = createAppAsyncThunk<UserModelType>('chatApp/user/getUserData', async () => {
	const response = await axios.get('/api/chat/user');

	const data = (await response.data) as UserModelType;

	return data;
});

export const updateUserData = createAppAsyncThunk<UserModelType, DeepPartial<UserModelType>>(
	'chatApp/user/updateUserData',
	async (newData) => {
		const response = await axios.post('/api/chat/user', newData);

		const data = (await response.data) as UserModelType;

		return data;
	}
);

const initialState: PartialDeep<UserModelType> = {};

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

export const selectUser = (state: AppRootState) => state.chatApp.user;

export type userSliceType = typeof userSlice;

export default userSlice;
