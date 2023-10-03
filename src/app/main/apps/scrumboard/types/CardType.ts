import { ChecklistType } from './ChecklistType';
import { CommentsType } from './CommentType';
import { AttachmentType } from './AttachmentType';

type Label = string;

type MemberId = string;

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
