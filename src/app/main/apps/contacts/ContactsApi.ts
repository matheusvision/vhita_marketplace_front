import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './store/searchTextSlice';
import { AppRootStateType } from './store';

export const addTagTypes = [
	'contacts_item',
	'contacts_list',
	'contacts_tag',
	'contacts_tags',
	'contacts_countries'
] as const;

const ContactsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getContactList: build.query<GetContactListApiResponse, GetContactListApiArg>({
				query: () => ({ url: `/mock-api/contacts` }),
				providesTags: ['contacts_list']
			}),
			createContactItem: build.mutation<CreateContactItemApiResponse, CreateContactItemApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts`,
					method: 'POST',
					data: queryArg.contact
				}),
				invalidatesTags: ['contacts_list']
			}),
			getContactItem: build.query<GetContactItemApiResponse, GetContactItemApiArg>({
				query: (contactId) => ({ url: `/mock-api/contacts/${contactId}` }),
				providesTags: ['contacts_item']
			}),
			updateContactItem: build.mutation<UpdateContactItemApiResponse, UpdateContactItemApiArg>({
				query: (contact) => ({
					url: `/mock-api/contacts/${contact.id}`,
					method: 'PUT',
					data: contact
				}),
				invalidatesTags: ['contacts_item', 'contacts_list']
			}),
			deleteContactItem: build.mutation<DeleteContactItemApiResponse, DeleteContactItemApiArg>({
				query: (contactId) => ({
					url: `/mock-api/contacts/${contactId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts_list']
			}),
			getContactTag: build.query<GetContactTagApiResponse, GetContactTagApiArg>({
				query: (tagId) => ({ url: `/mock-api/contacts/tags/${tagId}` }),
				providesTags: ['contacts_tag']
			}),
			updateContactTag: build.mutation<UpdateContactTagApiResponse, UpdateContactTagApiArg>({
				query: (tag) => ({
					url: `/mock-api/contacts/tags/${tag.id}`,
					method: 'PUT',
					body: tag
				}),
				invalidatesTags: ['contacts_tags']
			}),
			deleteContactTag: build.mutation<DeleteContactTagApiResponse, DeleteContactTagApiArg>({
				query: (tagId) => ({
					url: `/mock-api/contacts/tags/${tagId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts_tags']
			}),
			getContactTagList: build.query<GetContactTagListApiResponse, GetContactTagListApiArg>({
				query: () => ({ url: `/mock-api/contacts/tags` }),
				providesTags: ['contacts_tags']
			}),
			getContactCountryList: build.query<GetContactCountryListApiResponse, GetContactCountryListApiArg>({
				query: () => ({ url: `/mock-api/countries` }),
				providesTags: ['contacts_countries']
			}),
			createContactTag: build.mutation<CreateContactTagApiResponse, CreateContactTagApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts/tags`,
					method: 'POST',
					body: queryArg.tag
				}),
				invalidatesTags: ['contacts_tags']
			})
		}),
		overrideExisting: false
	});
export { ContactsApi as Api };
export type GetContactItemApiResponse = /** status 200 User Found */ ContactRead;
export type GetContactItemApiArg = string;
export type UpdateContactItemApiResponse = /** status 200 Contact Updated */ ContactRead;
export type UpdateContactItemApiArg = Contact;
export type DeleteContactItemApiResponse = unknown;
export type DeleteContactItemApiArg = string;
export type GetContactListApiResponse = /** status 200 OK */ ContactRead[];
export type GetContactListApiArg = void;
export type CreateContactItemApiResponse = /** status 201 Created */ ContactRead;
export type CreateContactItemApiArg = {
	contact: Contact;
};
export type GetContactTagApiResponse = /** status 200 Tag Found */ Tag;
export type GetContactTagApiArg = string;
export type GetContactCountryListApiResponse = /** status 200 */ Country[];
export type GetContactCountryListApiArg = void;
export type UpdateContactTagApiResponse = /** status 200 */ Tag;
export type UpdateContactTagApiArg = Tag;
export type DeleteContactTagApiResponse = unknown;
export type DeleteContactTagApiArg = string;
export type GetContactTagListApiResponse = /** status 200 OK */ Tag[];
export type GetContactTagListApiArg = void;
export type CreateContactTagApiResponse = /** status 200 OK */ Tag;
export type CreateContactTagApiArg = {
	tag: Tag;
};

export type ContactPhoneNumber = {
	country: string;
	phoneNumber: string;
	label?: string;
};

export type ContactEmail = {
	email: string;
	label?: string;
};

export type Contact = {
	id: string;
	avatar?: string;
	background?: string;
	name: string;
	emails?: ContactEmail[];
	phoneNumbers?: ContactPhoneNumber[];
	title?: string;
	company?: string;
	birthday?: string;
	address?: string;
	notes?: string;
	tags?: string[];
};

export type ContactRead = {
	id: string;
	avatar?: string;
	background?: string;
	name: string;
	emails?: ContactEmail[];
	phoneNumbers?: ContactPhoneNumber[];
	title?: string;
	company?: string;
	birthday?: string;
	address?: string;
	notes?: string;
	tags?: string[];
};

export type Tag = {
	id: string;
	title: string;
};

export type Country = {
	id?: string;
	title?: string;
	iso?: string;
	code?: string;
	flagImagePos?: string;
};

export type GroupedContacts = {
	group: string;
	children?: ContactRead[];
};

export type AccumulatorType = {
	[key: string]: GroupedContacts;
};

export const {
	useGetContactItemQuery,
	useUpdateContactItemMutation,
	useDeleteContactItemMutation,
	useGetContactListQuery,
	useCreateContactItemMutation,
	useGetContactTagQuery,
	useGetContactCountryListQuery,
	useUpdateContactTagMutation,
	useDeleteContactTagMutation,
	useGetContactTagListQuery,
	useCreateContactTagMutation
} = ContactsApi;

export default ContactsApi;

export type ContactsApiType = {
	[ContactsApi.reducerPath]: ReturnType<typeof ContactsApi.reducer>;
};

export const selectContactList = (state: AppRootStateType) =>
	ContactsApi.endpoints.getContactList.select()(state)?.data ?? [];

/**
 * Select filtered contacts
 */
export const selectFilteredContactList = createSelector(
	[selectContactList, selectSearchText],
	(contacts, searchText) => {
		if (searchText.length === 0) {
			return contacts;
		}
		return FuseUtils.filterArrayByString<ContactRead>(contacts, searchText);
	}
);

/**
 * Select grouped contacts
 */
export const selectGroupedFilteredContacts = createSelector([selectFilteredContactList], (contacts) => {
	const sortedContacts = [...contacts]?.sort((a, b) => a?.name?.localeCompare(b.name, 'es', { sensitivity: 'base' }));

	const groupedObject = sortedContacts?.reduce<AccumulatorType>((r, e) => {
		// get first letter of name of current element
		const group = e.name[0];

		// if there is no property in accumulator with this letter create it
		if (!r[group]) r[group] = { group, children: [e] };
		// if there is push current element to children array for that letter
		else {
			r[group]?.children?.push(e);
		}

		// return accumulator
		return r;
	}, {});

	return groupedObject;
});
