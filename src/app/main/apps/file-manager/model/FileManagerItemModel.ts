import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type FileManagerItemType = {
	id: string;
	folderId: string;
	name: string;
	createdBy: string;
	createdAt: string;
	modifiedAt: string;
	size: string;
	type: string;
	contents: string;
	description: string;
};

export type FileManagerItemsType = FileManagerItemType[];

const FileManagerItemModel = (data: PartialDeep<FileManagerItemType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		folderId: '',
		name: '',
		createdBy: '',
		createdAt: '',
		modifiedAt: '',
		size: '',
		type: '',
		contents: '',
		description: ''
	});

export default FileManagerItemModel;
