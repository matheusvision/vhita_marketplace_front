import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { ChatListItemType, ChatListType } from '../model/ChatListItemModel';

export const getChatList = createAppAsyncThunk<ChatListType>('chatApp/chatList/get', async () => {
	const response = await axios.get('/api/chat/chats');

	const data = (await response.data) as ChatListType;

	return data;
});

const chatsAdapter = createEntityAdapter<ChatListItemType>();

const initialState = chatsAdapter.getInitialState();

export const { selectAll: selectChats, selectById: selectChatById } = chatsAdapter.getSelectors(
	(state: AppRootState) => state.chatApp.chatList
);

const chatListSlice = createSlice({
	name: 'chatApp/chatList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getChatList.fulfilled, (state, action) => chatsAdapter.setAll(state, action.payload));
	}
});

type AppRootState = RootState<typeof chatListSlice>;

export default chatListSlice.reducer;
