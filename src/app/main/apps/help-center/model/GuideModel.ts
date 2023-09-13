import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type GuideModelType = {
	id: string;
	categoryId: string;
	slug: string;
	title: string;
	subtitle: string;
	content: string;
};

export type GuidesModelType = GuideModelType[];

const GuideModel = (data: PartialDeep<GuideModelType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		categoryId: '',
		slug: '',
		title: '',
		subtitle: '',
		content: ''
	});

export default GuideModel;
