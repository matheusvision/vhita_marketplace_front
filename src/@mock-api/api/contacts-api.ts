import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { PartialDeep } from 'type-fest';
import mockApi from '../mock-api.json';
import mock from '../mock';
import ContactModel, { ContactsType, ContactType } from '../../app/main/apps/contacts/model/ContactModel';

const contactsDB = mockApi.components.examples.contacts.value as ContactsType;
const tagsDB = mockApi.components.examples.contacts_tags.value;

mock.onGet('/api/contacts').reply(() => {
	return [200, contactsDB];
});

mock.onPost('/api/contacts').reply(({ data }: { data: string }) => {
	const newContact = ContactModel({ id: FuseUtils.generateGUID(), ...JSON.parse(data) } as PartialDeep<ContactType>);

	contactsDB.push(newContact);

	return [200, newContact];
});

mock.onGet(/\/api\/contacts\/(?!tags)[^/]+/).reply((config) => {
	const { id } = config.url.match(/\/api\/contacts\/(?<id>[^/]+)/).groups;
	const contact = _.find(contactsDB, { id });

	if (contact) {
		return [200, contact];
	}

	return [404, 'Requested task do not exist.'];
});

mock.onPut(/\/api\/contacts\/[^/]+/).reply(({ url, data }: { url: string; data: string }) => {
	const { id } = url.match(/\/api\/contacts\/(?<id>[^/]+)/).groups;

	_.assign(_.find(contactsDB, { id }), JSON.parse(data));

	return [200, _.find(contactsDB, { id })];
});

mock.onDelete(/\/api\/contacts\/[^/]+/).reply((config) => {
	const { id } = config.url.match(/\/api\/contacts\/(?<id>[^/]+)/).groups;

	_.remove(contactsDB, { id });

	return [200, id];
});

mock.onGet('/api/contacts/tags').reply(() => {
	return [200, tagsDB];
});
