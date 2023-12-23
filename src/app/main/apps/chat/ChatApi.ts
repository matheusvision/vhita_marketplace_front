import { apiService as api } from 'app/store/apiService';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

export const addTagTypes = [
	'chat_contact_list',
	'chat_contact',
	'chat_chats',
	'chat_chat',
	'chat_user_profile'
] as const;

const ChatApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getChatContactList: build.query<GetChatContactListApiResponse, GetChatContactListApiArg>({
				query: () => ({ url: `/mock-api/chat/contacts` }),
				providesTags: ['chat_contact_list']
			}),
			getChatContact: build.query<GetChatContactApiResponse, GetChatContactApiArg>({
				query: (queryArg) => ({ url: `/mock-api/chat/contacts/${queryArg}` }),
				providesTags: ['chat_contact']
			}),
			updateChatContact: build.mutation<UpdateChatContactApiResponse, UpdateChatContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/contacts/${queryArg.id}`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['chat_contact']
			}),
			deleteChatContact: build.mutation<DeleteChatContactApiResponse, DeleteChatContactApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/contacts/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['chat_contact']
			}),
			getChatList: build.query<GetChatListApiResponse, GetChatListApiArg>({
				query: () => ({ url: `/mock-api/chat/chats` }),
				providesTags: ['chat_chats']
			}),
			getChatItem: build.query<GetChatItemApiResponse, GetChatItemApiArg>({
				query: (queryArg) => ({ url: `/mock-api/chat/chats/${queryArg}` }),
				providesTags: ['chat_chat']
			}),
			deleteChatItem: build.mutation<DeleteChatItemApiResponse, DeleteChatItemApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/chats/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['chat_chats']
			}),
			sendChatMessage: build.mutation<SendChatMessageApiResponse, SendChatMessageApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/chat/chats/${queryArg.contactId}`,
					method: 'POST',
					data: queryArg.message
				}),
				invalidatesTags: ['chat_chat', 'chat_chats']
			}),
			getChatUserProfile: build.query<GetChatUserProfileApiResponse, GetChatUserProfileApiArg>({
				query: () => ({ url: `/mock-api/chat/profile` }),
				providesTags: ['chat_user_profile']
			}),
			updateChatUserProfile: build.mutation<UpdateChatUserProfileApiResponse, UpdateChatUserProfileApiArg>({
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
export type GetChatContactListApiResponse = /** status 200 OK */ Contact[];
export type GetChatContactListApiArg = void;
export type GetChatContactApiResponse = /** status 200 OK */ Contact;
export type GetChatContactApiArg = string;
export type UpdateChatContactApiResponse = unknown;
export type UpdateChatContactApiArg = Contact;
export type DeleteChatContactApiResponse = unknown;
export type DeleteChatContactApiArg = string;
export type GetChatListApiResponse = /** status 200 OK */ Chat[];
export type GetChatListApiArg = void;
export type GetChatItemApiResponse = /** status 200 OK */ Message[];
export type GetChatItemApiArg = string;
export type DeleteChatItemApiResponse = unknown;
export type DeleteChatItemApiArg = string;
export type SendChatMessageApiArg = {
	contactId: string;
	message: string;
};
export type SendChatMessageApiResponse = Message[];
export type GetChatUserProfileApiResponse = Profile;
export type GetChatUserProfileApiArg = void;
export type UpdateChatUserProfileApiResponse = Profile;
export type UpdateChatUserProfileApiArg = PartialObjectDeep<Profile, object>;
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
	useGetChatContactListQuery,
	useGetChatContactQuery,
	useUpdateChatContactMutation,
	useDeleteChatContactMutation,
	useGetChatListQuery,
	useGetChatItemQuery,
	useDeleteChatItemMutation,
	useGetChatUserProfileQuery,
	useUpdateChatUserProfileMutation,
	useSendChatMessageMutation
} = ChatApi;
