import { RootState } from 'app/store/index';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = boolean;

const initialState: initialStateType = false;

const stateSlice = createSlice({
	name: 'notificationPanel/state',
	initialState,
	reducers: {
		toggleNotificationPanel: (state) => !state,
		openNotificationPanel: () => true,
		closeNotificationPanel: () => false
	}
});

export const { toggleNotificationPanel, openNotificationPanel, closeNotificationPanel } = stateSlice.actions;

type AppRootState = RootState<typeof stateSlice>;

export const selectNotificationPanelState = (state: AppRootState) => state.notificationPanel.state;

export default stateSlice;
