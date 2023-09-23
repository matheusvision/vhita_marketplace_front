import _ from '@lodash';

export type ListType = {
	id: string;
	boardId: string;
	title: string;
};

export type ListsType = ListType[];

function ListModel(data: Partial<ListType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		boardId: '',
		title: ''
	});
}

export default ListModel;
