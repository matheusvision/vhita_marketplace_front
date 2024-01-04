/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { RootStateType } from 'app/store/types';
import { User } from 'src/app/auth/user';
import { PartialDeep } from 'type-fest';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import _ from '@lodash';

type AppRootStateType = RootStateType<userSliceType>;

/**
 * Updates the user's settings in the Redux store and returns the updated user object.
 */
export const updateUserSettings = createAppAsyncThunk(
	'user/updateSettings',
	async (settings: FuseSettingsConfigType, { getState }) => {
		const AppState = getState() as AppRootStateType;
		const { user } = AppState;

		const isUserGuest = selectIsUserGuest(AppState);

		if (isUserGuest) {
			return null;
		}

		const userRequestData = { data: { ...user.data, settings } } as User;

		return null;
		/* try {
			const response = await jwtService.updateUserData(userRequestData);

			dispatch(showMessage({ message: 'User settings saved with api' }));

			return response.data as User;
		} catch (error) {
			const axiosError = error as AxiosError;

			dispatch(showMessage({ message: axiosError.message }));

			return rejectWithValue(axiosError.message);
		} */
	}
);

function updateRedirectUrl(user: PartialDeep<User>) {
	/*
    You can redirect the logged-in user to a specific route depending on his role
    */
	if (user?.data?.loginRedirectUrl && user?.data?.loginRedirectUrl !== '') {
		settingsConfig.loginRedirectUrl = user.data.loginRedirectUrl; // for example 'apps/academy'
	}
}

/**
 * Sets the user object in the Redux store.
 */
export const setUser = createAppAsyncThunk<User, User>('user/setUser', async (user) => {
	updateRedirectUrl(user);

	return user;
});

/**
 * Reset the user state.
 */
export const resetUser = createAppAsyncThunk('user/resetUser', async () => {
	return true;
});

/**
 * The initial state of the user slice.
 */
const initialState: User = {
	uid: '',
	role: null, // guest
	data: {
		displayName: 'Guest User',
		photoURL: '',
		email: '',
		shortcuts: []
	}
};

/**
 * The User slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		/**
		 * Updates the user object in the Redux store.
		 */
		updateUser: (state, action) => {
			const user = action.payload as PartialDeep<User>;

			return _.defaultsDeep(state, user) as User;
		},
		userSignOut: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(setUser.fulfilled, (state, action) => action.payload);
		builder.addCase(resetUser.fulfilled, (state) => {
			if (!_.isEqual(state, initialState)) {
				return initialState;
			}
			return undefined;
		});
	}
});

export const { userSignOut, updateUser } = userSlice.actions;

export const selectUser = (state: AppRootStateType) => state.user;

export const selectUserRole = (state: AppRootStateType) => state.user.role;

export const selectIsUserGuest = (state: AppRootStateType) => {
	const { role } = state.user;

	return !role || role.length === 0;
};

export const selectUserShortcuts = (state: AppRootStateType) => state.user.data.shortcuts;

export type userSliceType = typeof userSlice;

export default userSlice;
