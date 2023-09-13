import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type GuideCategoryType = {
	id: string;
	slug: string;
	title: string;
};

export type GuideCategoriesType = GuideCategoryType[];

const GuideCategoryModel = (data: PartialDeep<GuideCategoryType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		slug: '',
		title: ''
	});

export default GuideCategoryModel;
