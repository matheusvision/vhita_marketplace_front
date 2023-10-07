import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { LabelType } from '../types/LabelType';

/**
 * The label model.
 * @param data The label data.
 * @returns The label model.
 */
function LabelModel(data: PartialDeep<LabelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: ''
	});
}

export default LabelModel;
