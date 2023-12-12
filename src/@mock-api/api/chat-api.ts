import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { Chat, Contact, Message, Profile } from 'src/app/main/apps/chat/ChatApi';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { Params } from '../ExtendedMockAdapter';

const contactsDB = mockApi.components.examples.chat_contacts.value;
let userDB = mockApi.components.examples.chat_profile.value;
const userChatListDB = mockApi.components.examples.chat_chats.value as Chat[];
const messages = mockApi.components.examples.chat_messages.value;
const chatsDB = userChatListDB.map((chat) => ({
	...chat,
	messages: messages.map((message) => ({
		...message,
		contactId: message.contactId === '' ? chat.contactId : userDB.id
	}))
}));

mock.onGet('/chat/contacts').reply(() => {
	return [200, contactsDB];
});

mock.onGet('/chat/contacts/:contactId').reply((config) => {
	const { contactId } = config.params as Params;

	const contact = _.find(contactsDB, { id: contactId }) as Contact;

	if (!contact) {
		return [404, 'Requested data do not exist.'];
	}

	return [200, contact];
});

mock.onGet('/chat/chats').reply(() => {
	userChatListDB.sort((d1, d2) => new Date(d2.lastMessageAt).getTime() - new Date(d1.lastMessageAt).getTime());

	return [200, userChatListDB];
});

mock.onGet('/chat/chats/:contactId').reply((config) => {
	const { contactId } = config.params as Params;

	const contact = _.find(contactsDB, { id: contactId }) as Contact;

	if (!contact) {
		return [404, 'Requested data do not exist.'];
	}

	const chat = _.find(chatsDB, { contactId })?.messages;

	if (chat) {
		return [200, chat];
	}

	return [200, []];
});

mock.onPost('/chat/chats/:contactId').reply((config) => {
	const { contactId } = config.params as Params;

	const contact = _.find(contactsDB, { id: contactId });

	if (!contact) {
		return [404, 'Requested data do not exist.'];
	}

	const contactChat = _.find(chatsDB, { contactId }) as Chat;

	if (!contactChat) {
		createNewChat(contactId);
	}

	const newMessage = createNewMessage(config.data as string, contactId);

	return [200, newMessage];
});

mock.onGet('/chat/profile').reply(() => {
	return [200, userDB as Profile];
});

mock.onPut('/chat/profile').reply(({ data }) => {
	const userData = JSON.parse(data as string) as Profile;

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

	const selectedChat = _.find(chatsDB, { contactId }) as Chat & { messages: Message[] };
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
	} as Chat;

	userChatListDB.push(newChat);

	const newMessageData = {
		...newChat,
		messages: []
	};

	chatsDB.push(newMessageData);

	return newMessageData;
}
