import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { getChatList } from './chatListSlice';
import { ChatMessagesType, ChatMessageType } from '../types/ChatMessageType';
import { ContactType } from '../types/ContactType';

type AppRootStateType = RootStateType<chatMessagesSliceType>;

export const getChat = createAppAsyncThunk<ChatMessagesType, ChatMessageType['contactId']>(
	'chatPanel/chat/getChat',
	async (contactId) => {
		const response = await axios.get(`/api/chat/chats/${contactId}`);

		const data = (await response.data) as ChatMessagesType;

		return data;
	}
);

export const sendMessage = createAppAsyncThunk<ChatMessageType, { messageText: string; contactId: ContactType['id'] }>(
	'chatPanel/chat/sendMessage',
	async ({ messageText, contactId }, { dispatch }) => {
		const response = await axios.post(`/api/chat/chats/${contactId}`, messageText);

		const data = (await response.data) as ChatMessageType;

		dispatch(getChatList());

		return data;
	}
);

const initialState: ChatMessagesType = [];

const chatMessagesSlice = createSlice({
	name: 'chatPanel/chat',
	initialState,
	reducers: {
		// removeChat: (state, action) => action.payload
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChat.fulfilled, (state, action) => action.payload)
			.addCase(sendMessage.fulfilled, (state, action) => [...state, action.payload]);
	}
});

export const selectChat = (state: AppRootStateType) => state.chatPanel.chat;

export type chatMessagesSliceType = typeof chatMessagesSlice;

export default chatMessagesSlice;
