import { CheckListItemType } from './CheckListItemType';

export type ChecklistType = {
	id?: string;
	name: string;
	checkItems: CheckListItemType[];
};

export type ChecklistsType = ChecklistType[];
