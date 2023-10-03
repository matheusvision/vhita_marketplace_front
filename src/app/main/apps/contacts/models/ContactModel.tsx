import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ContactPhoneNumberType } from '../types/ContactPhoneNumberType';
import { ContactEmailType } from '../types/ContactEmailType';
import { ContactType } from '../types/ContactType';

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
