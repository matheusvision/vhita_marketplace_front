import { ContactEmailsType } from './ContactEmailType';
import { ContactPhoneNumbersType } from './ContactPhoneNumberType';

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
