import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { ReactNode } from 'react';
import { FuseSettingsConfigProps } from '@fuse/core/FuseSettings/FuseSettings';

export type UserModelProps = {
	uuid?: string;
	role?: string[] | string;
	from?: string;
	data?: {
		displayName?: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigProps>;
	};
};

function UserModel(data: UserModelProps) {
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
	}) as UserModelProps;
}

export default UserModel;
