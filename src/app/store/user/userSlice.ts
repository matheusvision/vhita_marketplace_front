/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseSettingsConfigProps } from '@fuse/core/FuseSettings/FuseSettings';
import { AppDispatch, RootState } from 'app/store/index';
import { UserProps } from 'app/store/user/index';
import jwtService from '../../auth/services/jwtService';
import createAppAsyncThunk from '../createAppAsyncThunk';

export const setUser = createAsyncThunk('user/setUser', (user?: UserProps) => {
	/*
    You can redirect the logged-in user to a specific route depending on his role
    */
	if (user.loginRedirectUrl) {
		settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
	}

	return Promise.resolve(user);
});

export const updateUserSettings = createAppAsyncThunk(
	'user/updateSettings',
	async (settings: FuseSettingsConfigProps, thunkApi) => {
		const { dispatch, getState } = thunkApi;
		const { user } = getState();

		const newUser = _.merge({}, user, { data: { settings } }) as UserProps;

		await dispatch(updateUserData(newUser));

		return Promise.resolve(newUser);
	}
);

export const updateUserShortcuts = createAppAsyncThunk(
	'user/updateShortucts',
	async (shortcuts: string[], thunkApi) => {
		const { dispatch, getState } = thunkApi;
		const { user } = getState();
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		await dispatch(updateUserData(newUser));

		return newUser;
	}
);

export const logoutUser = () => async (dispatch: AppDispatch, getState: () => RootState) => {
	const { user } = getState();

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	dispatch(setInitialSettings());

	return Promise.resolve(dispatch(userLoggedOut()));
};

export const updateUserData = (user: UserProps) => async (dispatch: AppDispatch) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	await jwtService
		.updateUserData(user)
		.then(() => {
			dispatch(showMessage({ message: 'User data saved with api' }));
		})
		.catch((error: Error) => {
			dispatch(showMessage({ message: error.message }));
		});
};

const initialState: UserProps = {
	role: [], // guest
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/brian-hughes.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks']
	}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLoggedOut: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(setUser.fulfilled, (state, action) => action.payload)
			.addCase(updateUserSettings.fulfilled, (state, action) => action.payload)
			.addCase(updateUserShortcuts.fulfilled, (state, action) => action.payload);
	}
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectUserShortcuts = (state: RootState) => state.user.data.shortcuts;

export default userSlice.reducer;
