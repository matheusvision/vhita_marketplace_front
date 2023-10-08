import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { UserType } from '../types/UserType';

/**
 * User model.
 *
 * @param {PartialDeep<UserType>} data - The data.
 * @returns {UserType} The user model.
 */
function UserModel(data?: PartialDeep<UserType>) {
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
