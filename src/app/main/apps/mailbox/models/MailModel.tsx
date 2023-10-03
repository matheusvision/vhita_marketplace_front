import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { MailType } from '../types/MailType';

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
