import { NoteListItemsType } from './NoteListItemType';

/**
 * NoteType
 */
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

/**
 * NotesType
 */
export type NotesType = NoteType[];
