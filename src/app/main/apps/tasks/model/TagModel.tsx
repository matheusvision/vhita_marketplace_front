import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type TagType = {
	id: string;
	title: string;
};

export type TagsType = TagType[];

const TagModel = (data: PartialDeep<TagType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: ''
	}) as TagType;

export default TagModel;
