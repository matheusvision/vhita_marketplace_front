import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CheckListItemType } from './ChecklistItemModel';

export type ChecklistType = {
	id?: string;
	name: string;
	checkItems: CheckListItemType[];
};

export type ChecklistsType = ChecklistType[];

function ChecklistModel(data: PartialDeep<ChecklistType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		checkItems: []
	});
}

export default ChecklistModel;
