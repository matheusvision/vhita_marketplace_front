import _ from '@lodash';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

export type UserModelType = {
	uuid?: string;
	role?: string[] | string;
	from?: string;
	data?: {
		displayName?: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigType>;
	};
};

function UserModel(data: UserModelType) {
	data = data || {};

	return _.defaults(data, {
		role: [],
		data: {
			displayName: 'John Doe',
			photoURL: 'assets/images/avatars/brian-hughes.jpg',
			email: 'johndoe@withinpixels.com',
			shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
			settings: {}
		}
	}) as UserModelType;
}

export default UserModel;
