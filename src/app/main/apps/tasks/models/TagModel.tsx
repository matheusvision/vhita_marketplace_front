import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { TagType } from '../types/TagType';

const TagModel = (data: PartialDeep<TagType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: ''
	}) as TagType;

export default TagModel;
