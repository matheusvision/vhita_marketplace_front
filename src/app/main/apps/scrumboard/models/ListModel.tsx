import _ from '@lodash';
import { ListType } from '../types/ListType';

function ListModel(data: Partial<ListType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		boardId: '',
		title: ''
	});
}

export default ListModel;
