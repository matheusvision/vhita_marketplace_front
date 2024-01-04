import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { User } from 'src/app/auth/user';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<User>): User {
	data = data || {};

	return _.defaults(data, {
		uid: '',
		role: ['admin'],
		data: {
			displayName: 'John Doe',
			photoURL: 'assets/images/avatars/brian-hughes.jpg',
			email: 'johndoe@withinpixels.com',
			shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
			settings: {}
		}
	});
}

export default UserModel;
