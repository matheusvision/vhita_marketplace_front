import MailAttachmentType from './MailAttachmentType';

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
	attachments: MailAttachmentType[];
	starred: boolean;
	important: boolean;
	unread: boolean;
	folder: string;
	labels: string[];
};

export type MailsType = MailType[];
