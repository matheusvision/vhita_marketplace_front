import { ContactEmailType } from './ContactEmailType';
import { ContactPhoneNumberType } from './ContactPhoneNumberType';

export type ContactDetailsType = {
	emails: ContactEmailType[];
	phoneNumbers: ContactPhoneNumberType[];
	title: string;
	company: string;
	birthday: string;
	address: string;
};
