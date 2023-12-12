import { apiService as api } from 'app/store/apiService';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

export const addTagTypes = ['chat_contacts', 'chat_contact', 'chat_chats', 'chat_chat', 'chat_user_profile'] as const;

const ChatApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getContacts: build.query<GetContactsApiResponse, GetContactsApiArg>({
				query: () => ({ url: `/mock-api/chat/contacts` }),
				providesTags: ['chat_contacts']
			}),
			getContact: build.query<GetContactApiResponse, GetContactApiArg>({
				query: (queryArg) => ({ url: `/mock-api/chat/contacts/${queryArg}` }),
				providesTags: ['chat_contact']
			}),
			updateContact: build.mutation<UpdateContactApiResponse, UpdateContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/contacts/${queryArg.id}`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['chat_contact']
			}),
			deleteContact: build.mutation<DeleteContactApiResponse, DeleteContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/contacts/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['chat_contact']
			}),
			getChats: build.query<GetsChatsApiResponse, GetsChatsApiArg>({
				query: () => ({ url: `/mock-api/chat/chats` }),
				providesTags: ['chat_chats']
			}),
			getChat: build.query<GetChatApiResponse, GetChatApiArg>({
				query: (queryArg) => ({ url: `/mock-api/chat/chats/${queryArg}` }),
				providesTags: ['chat_chat']
			}),
			deleteChat: build.mutation<DeleteChatApiResponse, DeleteChatApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/chats/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['chat_chats']
			}),
			sendMessage: build.mutation<SendMessageApiResponse, SendMessageApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/chats/${queryArg.contactId}`,
					method: 'POST',
					data: queryArg.message
				}),
				invalidatesTags: ['chat_chat', 'chat_chats']
			}),
			getUserProfile: build.query<GetUserProfileApiResponse, GetUserProfileApiArg>({
				query: () => ({ url: `/mock-api/chat/profile` }),
				providesTags: ['chat_user_profile']
			}),
			updateUserProfile: build.mutation<UpdateUserProfileApiResponse, UpdateUserProfileApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/profile`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['chat_user_profile']
			})
		}),
		overrideExisting: false
	});
export default ChatApi;
export type GetContactsApiResponse = /** status 200 OK */ Contact[];
export type GetContactsApiArg = void;
export type GetContactApiResponse = /** status 200 OK */ Contact;
export type GetContactApiArg = string;
export type UpdateContactApiResponse = unknown;
export type UpdateContactApiArg = Contact;
export type DeleteContactApiResponse = unknown;
export type DeleteContactApiArg = string;
export type GetsChatsApiResponse = /** status 200 OK */ Chat[];
export type GetsChatsApiArg = void;
export type GetChatApiResponse = /** status 200 OK */ Message[];
export type GetChatApiArg = string;
export type DeleteChatApiResponse = unknown;
export type DeleteChatApiArg = string;
export type SendMessageApiArg = {
	contactId: string;
	message: string;
};
export type SendMessageApiResponse = Message[];
export type GetUserProfileApiResponse = Profile;
export type GetUserProfileApiArg = void;
export type UpdateUserProfileApiResponse = Profile;
export type UpdateUserProfileApiArg = PartialObjectDeep<Profile, object>;
export type ContactStatusType = 'online' | 'do-not-disturb' | 'away' | 'offline';

export type Contact = {
	id: string;
	avatar?: string | null;
	name: string;
	about: string;
	details: {
		emails: {
			email: string;
			label: string;
		}[];
		phoneNumbers: {
			country: string;
			phoneNumber: string;
			label: string;
		}[];
		title?: string;
		company: string;
		birthday: string;
		address: string;
	};
	attachments: {
		media: string[];
		docs: string[];
		links: string[];
	};
	status: ContactStatusType;
};
export type Chat = {
	id: string;
	contactId: string;
	unreadCount: number;
	muted: boolean;
	lastMessage: string;
	lastMessageAt: string;
};
export type Message = {
	id: string;
	chatId: string;
	contactId: string;
	value: string;
	createdAt: string;
};
export type Task = {
	id: string;
	type: string;
	title: string;
	notes: string;
	completed: boolean;
	dueDate?: string | null;
	priority: number;
	tags: string[];
	assignedTo?: string;
	subTasks: {
		id: string;
		title: string;
		completed: boolean;
	}[];
	order: number;
};
export type Profile = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	about: string;
};

export const {
	useGetContactsQuery,
	useGetContactQuery,
	useUpdateContactMutation,
	useDeleteContactMutation,
	useGetChatsQuery,
	useGetChatQuery,
	useDeleteChatMutation,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	useSendMessageMutation
} = ChatApi;
