import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNotifications = createAsyncThunk('notificationPanel/getData', async () => {
	const response = await axios.get('/api/notifications');
	const data = await response.data;

	return data;
});

export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
	const response = await axios.delete('/api/notifications');
	await response.data;

	return true;
});

export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
	const response = await axios.delete(`/api/notifications/${id}`);
	await response.data;

	return id;
});

export const addNotification = createAsyncThunk('notificationPanel/addNotification', async (item) => {
	const response = await axios.post(`/api/notifications`, { ...item });
	const data = await response.data;

	return data;
});

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
	notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
	name: 'notificationPanel/data',
	initialState,
	reducers: {},
	extraReducers: {
		[dismissItem.fulfilled]: (state: any, action: any) => notificationsAdapter.removeOne(state, action.payload),
		[dismissAll.fulfilled]: (state: any, action: any) => notificationsAdapter.removeAll(state),
		[getNotifications.fulfilled]: (state: any, action: any) => notificationsAdapter.addMany(state, action.payload),
		[addNotification.fulfilled]: (state: any, action: any) => notificationsAdapter.addOne(state, action.payload)
	}
});

export default dataSlice.reducer;
