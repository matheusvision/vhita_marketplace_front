import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type ContactEmailType = { email: string; label: string };

export type ContactEmailsType = ContactEmailType[];

export type ContactPhoneNumberType = { country: string; phoneNumber: string; label: string };

export type ContactPhoneNumbersType = ContactPhoneNumberType[];

export type ContactType = {
	id: string;
	avatar: string;
	background: string;
	name: string;
	emails: ContactEmailsType;
	phoneNumbers: ContactPhoneNumbersType;
	title: string;
	company: string;
	birthday: string;
	address: string;
	notes: string;
	tags: string[];
};

export type ContactsType = ContactType[];

export const ContactPhoneModel = (data: PartialDeep<ContactPhoneNumberType> | null): ContactPhoneNumberType =>
	_.defaults(data || {}, {
		country: '',
		phoneNumber: '',
		label: 'string'
	});

export const ContactEmailModel = (data: PartialDeep<ContactEmailType> | null): ContactEmailType =>
	_.defaults(data || {}, {
		email: '',
		label: ''
	});

const ContactModel = (data: PartialDeep<ContactType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		avatar: '',
		background: '',
		name: '',
		emails: [ContactEmailModel({})],
		phoneNumbers: [{ country: 'us', phoneNumber: '', label: '' }],
		title: '',
		company: '',
		birthday: '',
		address: '',
		notes: '',
		tags: []
	});

export default ContactModel;
