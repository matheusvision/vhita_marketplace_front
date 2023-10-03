import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { GuideCategoryType } from '../types/GuideCategoryType';

const GuideCategoryModel = (data: PartialDeep<GuideCategoryType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		slug: '',
		title: ''
	});

export default GuideCategoryModel;
