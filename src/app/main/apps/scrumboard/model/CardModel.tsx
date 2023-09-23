import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ChecklistType } from './ChecklistModel';
import { CommentsType } from './CommentModel';

type Label = string;

type MemberId = string;

export type AttachmentType = {
	id: string;
	name: string;
	src: string;
	time: number;
	type: string;
	url?: string;
};

export type CardType = {
	id: string;
	boardId: string;
	listId: string;
	title: string;
	description: string;
	labels: Label[];
	dueDate: number;
	attachmentCoverId: string;
	memberIds: MemberId[];
	attachments: AttachmentType[];
	subscribed: boolean;
	checklists: ChecklistType[];
	activities: CommentsType;
};

export type CardsType = CardType[];

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
