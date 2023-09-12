import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type ContactStatusType = 'online' | 'do-not-disturb' | 'away' | 'offline';

export type ContactEmailType = { email: string; label: string };

export type ContactAttachmentsType = {
	media: string[];
	docs: string[];
	links: string[];
};

export type ContactPhoneNumberType = { country: string; phoneNumber: string; label: string };

export type ContactDetailsType = {
	emails: ContactEmailType[];
	phoneNumbers: ContactPhoneNumberType[];
	title: string;
	company: string;
	birthday: string;
	address: string;
};

export type ContactModelType = {
	id: string;
	avatar: string;
	name: string;
	about: string;
	status: ContactStatusType;
	details: Partial<ContactDetailsType>;
	attachments: ContactAttachmentsType;
};

export type ContactsModelType = ContactModelType[];

function ContactModel(data?: PartialDeep<ContactModelType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		avatar: '',
		name: '',
		about: '',
		status: 'offline',
		details: {
			emails: [],
			phoneNumbers: [],
			title: '',
			company: '',
			birthday: '',
			address: ''
		},
		attachments: {
			media: [],
			docs: [],
			links: []
		}
	});
}

export default ContactModel;
