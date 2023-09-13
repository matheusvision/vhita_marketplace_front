import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type FaqModelType = {
	id: string;
	categoryId: string;
	question: string;
	answer: string;
};

export type FaqsModelType = FaqModelType[];

const FaqModel = (data: PartialDeep<FaqModelType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		categoryId: '',
		question: '',
		answer: ''
	});

export default FaqModel;
