import { RootStateWith } from 'app/store/index';
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

export const selectNotificationPanelState = (state: RootStateWith<typeof stateSlice>) => state.notificationPanel.state;

export default stateSlice.reducer;
