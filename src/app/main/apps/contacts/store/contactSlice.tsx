import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import ContactModel, { ContactType } from '../model/ContactModel';
import { AppRootState } from '.';

export const getContact = createAppAsyncThunk<ContactType, string>('contactsApp/task/getContact', async (id) => {
	try {
		const response = await axios.get(`/api/contacts/${id}`);

		const data = (await response.data) as ContactType;

		return data;
	} catch (error) {
		history.push({ pathname: `/apps/contacts` });

		return null;
	}
});

export const addContact = createAppAsyncThunk<ContactType, ContactType>(
	'contactsApp/contacts/addContact',
	async (contact) => {
		const response = await axios.post('/api/contacts', contact);

		const data = (await response.data) as ContactType;

		return data;
	}
);

export const updateContact = createAppAsyncThunk<ContactType, DeepPartial<ContactType>>(
	'contactsApp/contacts/updateContact',
	async (contact) => {
		const response = await axios.put(`/api/contacts/${contact.id}`, contact);

		const data = (await response.data) as ContactType;

		return data;
	}
);

export const removeContact = createAppAsyncThunk<string, string>('contactsApp/contacts/removeContact', async (id) => {
	const response = await axios.delete(`/api/contacts/${id}`);

	await response.data;

	return id;
});

const initialState: ContactType = null;

const contactSlice = createSlice({
	name: 'contactsApp/contact',
	initialState,
	reducers: {
		newContact: () => ContactModel({}),
		resetContact: () => null
	},
	extraReducers: (builder) => {
		builder
			.addCase(getContact.pending, () => null)
			.addCase(getContact.fulfilled, (state, action) => action.payload)
			.addCase(updateContact.fulfilled, (state, action) => action.payload)
			.addCase(removeContact.fulfilled, () => null);
	}
});

export const selectContact = (state: AppRootState) => state.contactsApp.contact;

export const { resetContact, newContact } = contactSlice.actions;

export type contactSliceType = typeof contactSlice;

export default contactSlice;
