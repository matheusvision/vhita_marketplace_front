import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CardType } from '../types/CardType';

function CardModel(data: PartialDeep<CardType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		boardId: '',
		listId: '',
		title: '',
		description: '',
		labels: [],
		dueDate: 0,
		attachmentCoverId: '',
		memberIds: [],
		attachments: [],
		subscribed: false,
		checklists: [],
		activities: []
	});
}
export default CardModel;
