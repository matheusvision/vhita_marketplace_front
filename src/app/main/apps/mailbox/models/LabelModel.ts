import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { LabelType } from '../types/LabelType';

/**
 * The label model.
 * @param data The initial data.
 * @returns The label model.
 */
const LabelModel = (data: PartialDeep<LabelType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		slug: '',
		color: 'orange'
	});

export default LabelModel;
