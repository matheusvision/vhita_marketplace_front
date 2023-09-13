import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type FaqCategoryType = {
	id: string;
	slug: string;
	title: string;
};

export type FaqCategoriesType = FaqCategoryType[];

const FaqCategoryModel = (data: PartialDeep<FaqCategoryType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		slug: '',
		title: ''
	});

export default FaqCategoryModel;
