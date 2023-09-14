import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type LabelType = {
	id: string;
	title: string;
};

export type LabelsType = LabelType[];

function LabelModel(data: PartialDeep<LabelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: ''
	});
}

export default LabelModel;
