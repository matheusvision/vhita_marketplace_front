import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import ContactModel from 'src/app/main/apps/contacts/models/ContactModel';
import { PartialDeep } from 'type-fest';
import { Contact } from 'src/app/main/apps/contacts/ContactsApi';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { Params } from '../ExtendedMockAdapter';

const contactsDB = mockApi.components.examples.contacts.value as Contact[];
const tagsDB = mockApi.components.examples.contacts_tags.value;

mock.onGet('/contacts').reply(() => {
	return [200, contactsDB];
});

mock.onPost('/contacts').reply(({ data }) => {
	const newContact = ContactModel({
		id: FuseUtils.generateGUID(),
		...JSON.parse(data as string)
	} as PartialDeep<Contact>);

	contactsDB.push(newContact);

	return [200, newContact];
});

mock.onGet('/contacts/tags').reply(() => {
	return [200, tagsDB];
});

mock.onGet('/contacts/:id').reply((config) => {
	const { id } = config.params as Params;

	const contact = _.find(contactsDB, { id });

	if (contact) {
		return [200, contact];
	}

	return [404, 'Requested task do not exist.'];
});

mock.onPut('/contacts/:id').reply((config) => {
	const { id } = config.params as Params;

	_.assign(_.find(contactsDB, { id }), JSON.parse(config.data as string));

	return [200, _.find(contactsDB, { id })];
});

mock.onDelete('/contacts/:id').reply((config) => {
	const { id } = config.params as Params;

	_.remove(contactsDB, { id });

	return [200, id];
});
