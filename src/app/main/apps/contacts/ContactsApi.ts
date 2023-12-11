import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './store/searchTextSlice';
import { AppRootStateType } from './store';

export const addTagTypes = [
	'contacts_contact',
	'contacts_all',
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
			getContact: build.query<GetContactApiResponse, GetContactApiArg>({
				query: (queryArg) => ({ url: `/mock-api/contacts/${queryArg.contactId}` }),
				providesTags: ['contacts_contact']
			}),
			updateContact: build.mutation<UpdateContactApiResponse, UpdateContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts/${queryArg.contactId}`,
					method: 'PUT',
					data: queryArg.contact
				}),
				invalidatesTags: ['contacts_contact', 'contacts_all']
			}),
			deleteContact: build.mutation<DeleteContactApiResponse, DeleteContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts/${queryArg.contactId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts_all']
			}),
			getContacts: build.query<GetApiResponse, GetApiArg>({
				query: () => ({ url: `/mock-api/contacts` }),
				providesTags: ['contacts_all']
			}),
			createContact: build.mutation<CreateContactApiResponse, CreateContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts`,
					method: 'POST',
					data: queryArg.contact
				}),
				invalidatesTags: ['contacts_all']
			}),
			getTag: build.query<GetTagApiResponse, GetTagApiArg>({
				query: (queryArg) => ({ url: `/mock-api/contacts/tags/${queryArg.tagId}` }),
				providesTags: ['contacts_tag']
			}),
			updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts/tags/${queryArg.tagId}`,
					method: 'PUT',
					body: queryArg.tag
				}),
				invalidatesTags: ['contacts_tags']
			}),
			deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/contacts/tags/${queryArg.tagId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts_tags']
			}),
			getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
				query: () => ({ url: `/mock-api/contacts/tags` }),
				providesTags: ['contacts_tags']
			}),
			getCountries: build.query<GetCountriesApiResponse, GetCountriesApiArg>({
				query: () => ({ url: `/mock-api/countries` }),
				providesTags: ['contacts_countries']
			}),
			createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
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
export type GetContactApiResponse = /** status 200 User Found */ ContactRead;
export type GetContactApiArg = {
	/** contact id */
	contactId: string;
};
export type UpdateContactApiResponse = /** status 200 Contact Updated */ ContactRead;
export type UpdateContactApiArg = {
	/** contact id */
	contactId: string;
	/** Update user properties. */
	contact: Contact;
};
export type DeleteContactApiResponse = unknown;
export type DeleteContactApiArg = {
	/** contact id */
	contactId: string;
};
export type GetApiResponse = /** status 200 OK */ ContactRead[];
export type GetApiArg = void;
export type CreateContactApiResponse = /** status 201 Created */ ContactRead;
export type CreateContactApiArg = {
	contact: Contact;
};
export type GetTagApiResponse = /** status 200 Tag Found */ Tag;
export type GetTagApiArg = {
	/** tag id */
	tagId: string;
};
export type GetCountriesApiResponse = /** status 200 */ Country[];
export type GetCountriesApiArg = void;
export type UpdateTagApiResponse = /** status 200 */ Tag;
export type UpdateTagApiArg = {
	/** tag id */
	tagId: string;
	/** Update tag properties to update. */
	tag: Tag;
};
export type DeleteTagApiResponse = unknown;
export type DeleteTagApiArg = {
	/** tag id */
	tagId: string;
};
export type GetTagsApiResponse = /** status 200 OK */ Tag[];
export type GetTagsApiArg = void;
export type CreateTagApiResponse = /** status 200 OK */ Tag;
export type CreateTagApiArg = {
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
	useGetContactQuery,
	useUpdateContactMutation,
	useDeleteContactMutation,
	useGetContactsQuery,
	useCreateContactMutation,
	useGetTagQuery,
	useGetCountriesQuery,
	useUpdateTagMutation,
	useDeleteTagMutation,
	useGetTagsQuery,
	useCreateTagMutation
} = ContactsApi;

export default ContactsApi;

export type ContactsApiType = {
	[ContactsApi.reducerPath]: ReturnType<typeof ContactsApi.reducer>;
};

export const selectContacts = (state: AppRootStateType) =>
	ContactsApi.endpoints.getContacts.select()(state)?.data ?? [];

/**
 * Select filtered contacts
 */
export const selectFilteredContacts = createSelector([selectContacts, selectSearchText], (contacts, searchText) => {
	if (searchText.length === 0) {
		return contacts;
	}
	return FuseUtils.filterArrayByString<ContactRead>(contacts, searchText);
});

/**
 * Select grouped contacts
 */
export const selectGroupedFilteredContacts = createSelector([selectFilteredContacts], (contacts) => {
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
