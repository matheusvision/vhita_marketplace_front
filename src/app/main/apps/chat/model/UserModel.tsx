import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type UserModelType = {
	id: string;
	name: string;
	email: string;
	status: string;
	avatar: string;
	about: string;
};

function UserModel(data?: PartialDeep<UserModelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		name: '',
		email: '',
		status: '',
		avatar: '',
		about: ''
	});
}

export default UserModel;
