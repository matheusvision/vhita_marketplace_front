import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type FilterType = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};

export type FiltersType = FilterType[];

const FilterModel = (data: PartialDeep<FilterType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		slug: '',
		icon: ''
	});

export default FilterModel;
