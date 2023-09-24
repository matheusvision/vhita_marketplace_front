import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import { getChatList } from './chatListSlice';
import { ChatMessagesModelType, ChatMessageModelType } from '../model/ChatMessageModel';
import { ContactModelType } from '../model/ContactModel';

type AppRootState = RootState<chatMessagesSliceType>;

export const getChat = createAppAsyncThunk<ChatMessagesModelType, ChatMessageModelType['contactId']>(
	'chatApp/chat/getChat',
	async (contactId) => {
		const response = await axios.get(`/api/chat/chats/${contactId}`);

		const data = (await response.data) as ChatMessagesModelType;

		return data;
	}
);

export const sendMessage = createAppAsyncThunk<
	ChatMessageModelType,
	{ messageText: string; contactId: ContactModelType['id'] }
>('chatApp/chat/sendMessage', async ({ messageText, contactId }, { dispatch }) => {
	const response = await axios.post(`/api/chat/chats/${contactId}`, messageText);

	const data = (await response.data) as ChatMessageModelType;

	dispatch(getChatList());

	return data;
});

const initialState: ChatMessagesModelType = [];

const chatMessagesSlice = createSlice({
	name: 'chatApp/chat',
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

export const selectChat = (state: AppRootState) => state.chatApp.chat;

export type chatMessagesSliceType = typeof chatMessagesSlice;

export default chatMessagesSlice;
