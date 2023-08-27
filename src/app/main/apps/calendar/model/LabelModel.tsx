import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type LabelModelType = {
	id: string;
	title: string;
	color: string;
};

function LabelModel(data?: PartialDeep<LabelModelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		color: '#e75931'
	});
}

export default LabelModel;
