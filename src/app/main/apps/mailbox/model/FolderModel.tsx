import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type FolderType = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};

export type FoldersType = FolderType[];

const FolderModel = (data: PartialDeep<FolderType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		slug: '',
		icon: ''
	});

export default FolderModel;
