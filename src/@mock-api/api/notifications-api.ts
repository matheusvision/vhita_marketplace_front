import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import NotificationModel, {
	NotificationModelProps
} from 'app/theme-layouts/shared-components/notificationPanel/models/NotificationModel';
import mockApi from '../mock-api.json';
import mock from '../mock';

let notificationsDB: NotificationModelProps[] = mockApi.components.examples.notifications.value;

mock.onGet('/api/notifications').reply(() => [200, notificationsDB]);

mock.onDelete('/api/notifications').reply(() => {
	notificationsDB = [];
	return [200];
});

mock.onPost('/api/notifications').reply(({ data }: { data: string }) => {
	const newNotification = NotificationModel({
		id: FuseUtils.generateGUID(),
		...JSON.parse(data)
	} as NotificationModelProps);

	notificationsDB.push(newNotification);

	return [200, newNotification];
});

mock.onDelete(/\/api\/notifications\/[^/]+/).reply((config) => {
	const { id } = config.url.match(/\/api\/notifications\/(?<id>[^/]+)/).groups;

	_.remove(notificationsDB, { id });

	return [200, id];
});
