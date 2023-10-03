import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { getChat } from 'app/theme-layouts/shared-components/chatPanel/store/chatMessagesSlice';
import { ContactsType, ContactType } from '../types/ContactType';

export type AppRootStateType = RootStateType<contactsSliceType>;

export const getContacts = createAppAsyncThunk<ContactsType>('chatPanel/contacts/getContacts', async (params) => {
	const response = await axios.get('/api/chat/contacts', { params });

	const data = (await response.data) as ContactsType;

	return data;
});

const contactsAdapter = createEntityAdapter<ContactType>();

const initialState = contactsAdapter.getInitialState({
	selectedContactId: null
});

export const {
	selectAll: selectContacts,
	selectEntities: selectContactsEntities,
	selectById
} = contactsAdapter.getSelectors((state: AppRootStateType) => state.chatPanel.contacts);

const contactsSlice = createSlice({
	name: 'chatPanel/contacts',
	initialState,
	reducers: {
		setSelectedContactId: (state, action) => {
			state.selectedContactId = action.payload as string;
		},
		removeSelectedContactId: (state) => {
			state.selectedContactId = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getContacts.fulfilled, (state, action) => contactsAdapter.setAll(state, action.payload))
			.addCase(getChat.pending, (state, action) => {
				state.selectedContactId = action.meta.arg;
			});
	}
});

export const selectSelectedContactId = (state: AppRootStateType) =>
	state.chatPanel.contacts.selectedContactId as string;

export const selectContactById = (id: ContactType['id']) => (state: AppRootStateType) => selectById(state, id);

export type contactsSliceType = typeof contactsSlice;

export default contactsSlice;
