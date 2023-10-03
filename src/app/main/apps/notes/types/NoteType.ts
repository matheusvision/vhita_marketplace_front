import { NoteListItemsType } from './NoteListItemType';

export type NoteType = {
	id: string;
	title: string;
	content: string;
	tasks: NoteListItemsType;
	image: string;
	reminder: string;
	labels: string[];
	archived: boolean;
	createdAt: string;
	updatedAt: string;
};

export type NotesType = NoteType[];
