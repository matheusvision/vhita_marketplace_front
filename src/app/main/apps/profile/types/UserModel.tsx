import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type UserType = {
	name: string;
	avatar: string;
};

function UserModel(data: PartialDeep<UserType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		avatar: ''
	});
}

export default UserModel;
