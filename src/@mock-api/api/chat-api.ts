import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { ChatListType } from 'src/app/main/apps/chat/types/ChatListType';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { UserType } from '../../app/main/apps/chat/types/UserType';

const contactsDB = mockApi.components.examples.chat_contacts.value;
let userDB = mockApi.components.examples.chat_profile.value;
const userChatListDB = mockApi.components.examples.chat_chats.value as ChatListType;
const messages = mockApi.components.examples.chat_messages.value;
const chatsDB = userChatListDB.map((chat) => ({
	...chat,
	messages: messages.map((message) => ({
		...message,
		contactId: message.contactId === '' ? chat.contactId : userDB.id
	}))
}));

mock.onGet('/api/chat/contacts').reply(() => {
	return [200, contactsDB];
});

mock.onGet('/api/chat/chats').reply(() => {
	userChatListDB.sort((d1, d2) => new Date(d2.lastMessageAt).getTime() - new Date(d1.lastMessageAt).getTime());

	return [200, userChatListDB];
});

mock.onGet(/\/api\/chat\/chats\/[^/]+/).reply((config) => {
	const { contactId } = config.url.match(/\/api\/chat\/chats\/(?<contactId>[^/]+)/).groups;
	const contact = _.find(contactsDB, { id: contactId });

	if (!contact) {
		return [404, 'Requested data do not exist.'];
	}

	const data = _.find(chatsDB, { contactId })?.messages;

	if (data) {
		return [200, data];
	}

	return [200, []];
});

mock.onPost(/\/api\/chat\/chats\/[^/]+/).reply(({ url, data: value }) => {
	const { contactId } = url.match(/\/api\/chat\/chats\/(?<contactId>[^/]+)/).groups;
	const contact = _.find(contactsDB, { id: contactId });

	if (!contact) {
		return [404, 'Requested data do not exist.'];
	}

	const contactChat = _.find(chatsDB, { contactId });

	if (!contactChat) {
		createNewChat(contactId);
	}

	const newMessage = createNewMessage(value as string, contactId);

	return [200, newMessage];
});

mock.onGet('/api/chat/user').reply(() => {
	return [200, userDB as UserType];
});

mock.onPost('/api/chat/user').reply(({ data }: { data: string }) => {
	const userData = JSON.parse(data) as UserType;

	userDB = _.merge({}, userDB, userData);

	return [200, userDB];
});

function createNewMessage(value: string, contactId: string) {
	const message = {
		id: FuseUtils.generateGUID(),
		contactId: userDB.id,
		value,
		createdAt: new Date().toISOString(),
		chatId: ''
	};

	const selectedChat = _.find(chatsDB, { contactId });
	const userSelectedChat = _.find(userChatListDB, { contactId });

	selectedChat.messages.push(message);
	selectedChat.lastMessage = value;
	selectedChat.lastMessageAt = message.createdAt;
	userSelectedChat.lastMessage = value;
	userSelectedChat.lastMessageAt = message.createdAt;

	return message;
}

function createNewChat(contactId: string) {
	const newChat = {
		id: FuseUtils.generateGUID(),
		contactId,
		unreadCount: 0,
		muted: false,
		lastMessage: '',
		lastMessageAt: ''
	};

	userChatListDB.push(newChat);

	const newMessageData = {
		...newChat,
		messages: []
	};

	chatsDB.push(newMessageData);

	return newMessageData;
}
