import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type TagType = {
	id: string;
	title: string;
};

export type TagsType = TagType[];

const TagModel = (data: PartialDeep<TagsType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: ''
	});

export default TagModel;
