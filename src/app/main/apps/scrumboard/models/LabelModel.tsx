import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { LabelType } from '../types/LabelType';

function LabelModel(data: Partial<LabelType>) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		boardId: '',
		title: ''
	});
}

export default LabelModel;
