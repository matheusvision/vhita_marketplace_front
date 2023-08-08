import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { NotificationModelProps } from 'app/theme-layouts/shared-components/notificationPanel/model/NotificationModel';
import { RootState } from 'app/store/index';

export const getNotifications = createAppAsyncThunk('notificationPanel/getData', async () => {
	const response = await axios.get('/api/notifications');

	const data = (await response.data) as NotificationModelProps[];

	return data;
});

export const dismissAll = createAppAsyncThunk('notificationPanel/dismissAll', async () => {
	const response = await axios.delete('/api/notifications');
	await response.data;

	return true;
});

export const dismissItem = createAppAsyncThunk('notificationPanel/dismissItem', async (id: string) => {
	const response = await axios.delete(`/api/notifications/${id}`);
	await response.data;

	return id;
});

export const addNotification = createAppAsyncThunk(
	'notificationPanel/addNotification',
	async (item: NotificationModelProps) => {
		const response = await axios.post(`/api/notifications`, { ...item });

		const data = (await response.data) as NotificationModelProps;

		return data;
	}
);

const notificationsAdapter = createEntityAdapter<NotificationModelProps>();

const initialState = notificationsAdapter.getInitialState();

type NotificationPanelState = {
	data: ReturnType<typeof notificationsAdapter.getInitialState>;
};

type ExtendedRootState = RootState & {
	notificationPanel: NotificationPanelState;
};

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
	notificationsAdapter.getSelectors((state: ExtendedRootState) => state.notificationPanel.data);

const dataSlice = createSlice({
	name: 'notificationPanel/data',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(dismissItem.fulfilled, (state, action) =>
			notificationsAdapter.removeOne(state, action.payload)
		);
		builder.addCase(dismissAll.fulfilled, (state, action) => notificationsAdapter.removeAll(state));
		builder.addCase(getNotifications.fulfilled, (state, action) =>
			notificationsAdapter.addMany(notificationsAdapter.getInitialState(), action.payload)
		);
		builder.addCase(addNotification.fulfilled, (state, action) =>
			notificationsAdapter.addOne(notificationsAdapter.getInitialState(), action.payload)
		);
	}
});

export default dataSlice.reducer;
