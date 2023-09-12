import _ from '@lodash';
import { PartialDeep } from 'type-fest';

type MessageType = {
	id: string;
	contactId: string;
	value: string;
	createdAt: string;
};
export type ChatListItemType = {
	id: string;
	contactId: string;
	unreadCount: number;
	muted: boolean;
	lastMessage?: string;
	lastMessageAt?: string;
	messages?: MessageType[];
};

export type ChatListType = ChatListItemType[];

function ChatListItemModel(data?: PartialDeep<ChatListItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		contactId: null,
		unreadCount: 0,
		muted: false,
		lastMessage: '',
		lastMessageAt: null
	});
}

export default ChatListItemModel;
