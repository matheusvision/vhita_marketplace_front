import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type MemberType = {
	id?: string;
	name: string;
	avatar: string;
	class?: string;
};

export type MembersType = MemberType[];

function MemberModel(data: PartialDeep<MemberType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		avatar: ''
	});
}

export default MemberModel;
