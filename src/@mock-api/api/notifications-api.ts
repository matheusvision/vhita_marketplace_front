import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';

let notificationsDB = mockApi.components.examples.notifications.value;

mock.onGet('/api/notifications').reply((config: any) => [200, notificationsDB]);

mock.onDelete('/api/notifications').reply((config: any) => {
	notificationsDB = [];
	return [200];
});

mock.onPost('/api/notifications').reply(({ data }: any) => {
	const newNotification = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };

	notificationsDB.push(newNotification);

	return [200, newNotification];
});

mock.onDelete(/\/api\/notifications\/[^/]+/).reply((config: any) => {
	const { id } = config.url.match(/\/api\/notifications\/(?<id>[^/]+)/).groups;

	_.remove(notificationsDB, { id });

	return [200, id];
});
