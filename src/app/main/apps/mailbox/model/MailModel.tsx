import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type MailType = {
	id: string;
	type: string;
	from: {
		name: string;
		avatar: string;
		contact: string;
	};
	to: string;
	cc: string[];
	bcc: string[];
	date: string;
	subject: string;
	content: string;
	attachments: Attachment[];
	starred: boolean;
	important: boolean;
	unread: boolean;
	folder: string;
	labels: string[];
};

type Attachment = {
	type: string;
	name: string;
	size: number;
	preview: string;
	downloadUrl: string;
};

export type MailsType = MailType[];

const MailModel = (data: PartialDeep<MailType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		type: '',
		from: {
			name: '',
			avatar: '',
			contact: ''
		},
		to: '',
		cc: [],
		bcc: [],
		date: new Date().toISOString(),
		subject: '',
		content: '',
		attachments: [],
		starred: false,
		important: false,
		unread: false,
		folder: '',
		labels: []
	});

export default MailModel;
