import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type NoteListItemType = {
	id: string;
	content: string;
	completed: boolean;
};

export type NoteListItemsType = NoteListItemType[];

function NoteListItemModel(data: PartialDeep<NoteListItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		content: '',
		completed: false
	});
}

export default NoteListItemModel;
