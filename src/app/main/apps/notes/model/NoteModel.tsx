import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { NoteListItemsType } from './NoteListItemModel';

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

function NoteModel(data: PartialDeep<NoteType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		content: '',
		tasks: [],
		image: '',
		reminder: '',
		labels: [],
		archived: false,
		createdAt: '',
		updatedAt: ''
	});
}

export default NoteModel;
