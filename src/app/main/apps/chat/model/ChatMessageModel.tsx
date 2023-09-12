import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type ChatMessageModelType = {
	id: string;
	chatId: string;
	contactId: string;
	value: string;
	createdAt: string;
};

export type ChatMessagesModelType = ChatMessageModelType[];

function ChatMessageModel(data?: PartialDeep<ChatMessageModelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		chatId: '',
		contactId: '',
		value: '',
		createdAt: ''
	});
}

export default ChatMessageModel;
