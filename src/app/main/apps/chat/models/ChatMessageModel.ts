import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ChatMessageType } from '../types/ChatMessageType';

/**
 * Chat message model.
 *
 * @param {PartialDeep<ChatMessageType>} data - The data.
 * @returns {ChatMessageType} The chat message model.
 */
function ChatMessageModel(data?: PartialDeep<ChatMessageType>) {
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
