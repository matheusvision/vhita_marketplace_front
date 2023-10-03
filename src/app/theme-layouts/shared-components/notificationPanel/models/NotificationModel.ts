import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { ReactNode } from 'react';

export type NotificationModelProps = {
	id?: string;
	icon?: string;
	title?: string;
	description?: string;
	time?: string;
	read?: boolean;
	variant?: string;
	useRouter?: boolean;
	link?: string;
	image?: string;
	children?: ReactNode;
};

function NotificationModel(data: NotificationModelProps) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		icon: 'heroicons-solid:star',
		title: '',
		description: '',
		time: new Date().toISOString(),
		read: false,
		variant: 'default'
	}) as NotificationModelProps;
}

export default NotificationModel;
