import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import { ContactModelType, ContactsModelType } from '../model/ContactModel';

export const getContacts = createAppAsyncThunk<ContactsModelType>('chatApp/contacts/getContacts', async (params) => {
	const response = await axios.get('/api/chat/contacts', { params });

	const data = (await response.data) as ContactsModelType;

	return data;
});

const contactsAdapter = createEntityAdapter<ContactModelType>();

const initialState = contactsAdapter.getInitialState();

export const {
	selectAll: selectContacts,
	selectEntities: selectContactsEntities,
	selectById
} = contactsAdapter.getSelectors((state: AppRootState) => state.chatApp.contacts);

const contactsSlice = createSlice({
	name: 'chatApp/contacts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getContacts.fulfilled, (state, action) => contactsAdapter.setAll(state, action.payload));
	}
});

export const selectContactById = (id: ContactModelType['id']) => (state: AppRootState) => selectById(state, id);

export type AppRootState = RootState<typeof contactsSlice>;

export default contactsSlice.reducer;
