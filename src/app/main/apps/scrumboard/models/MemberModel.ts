import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ScrumboardMember } from '../ScrumboardApi';

/**
 * The member model.
 */
function MemberModel(data: PartialDeep<ScrumboardMember>): ScrumboardMember {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		avatar: ''
	});
}

export default MemberModel;
