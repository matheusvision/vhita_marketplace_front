import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { LabelColorsType } from '../mail/labelColors';

export type LabelType = {
	id: string;
	title: string;
	slug: string;
	color: LabelColorsType;
};

export type LabelsType = LabelType[];

const LabelModel = (data: PartialDeep<LabelType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		slug: '',
		color: 'orange'
	});

export default LabelModel;
