import _ from '@lodash';
import { PartialDeep } from 'type-fest';

type General = {
	gender: 'Male' | 'Female'; // Assuming only two possible values, adjust as needed
	birthday: string;
	locations: string[];
	about: string;
};

type Work = {
	occupation: string;
	skills: string;
	jobs: {
		company: string;
		date: string;
	}[];
};

type Contact = {
	address: string;
	tel: string[];
	websites: string[];
	emails: string[];
};

type Group = {
	id: string;
	name: string;
	category: string;
	members: string;
};

type Friend = {
	id: string;
	name: string;
	avatar: string;
};

export type ProfileType = {
	general: General;
	work: Work;
	contact: Contact;
	groups: Group[];
	friends: Friend[];
};

function ProfileModel(data: PartialDeep<ProfileType>) {
	data = data || {};

	return _.defaults(data, {
		general: {
			gender: 'Male',
			birthday: '',
			locations: [],
			about: ''
		},
		work: {
			occupation: '',
			skills: '',
			jobs: []
		},
		contact: {
			address: '',
			tel: [],
			websites: [],
			emails: []
		},
		groups: [],
		friends: []
	});
}

export default ProfileModel;
