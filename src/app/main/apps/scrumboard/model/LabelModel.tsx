import FuseUtils from '@fuse/utils';
import _ from '@lodash';

export type LabelType = {
	id: string;
	boardId: string;
	title: string;
};

export type LabelsType = LabelType[];

function LabelModel(data: Partial<LabelType>) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		boardId: '',
		title: ''
	});
}

export default LabelModel;
