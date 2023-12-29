import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import _ from '@lodash';
import { AppRootStateType } from './store';
import { LabelColorsType } from './mail/labelColors';

export const addTagTypes = [
	'mailbox_list',
	'mailbox_filters',
	'mailbox_labels',
	'mailbox_label',
	'mailbox_folders',
	'mailbox_mail'
] as const;

const MailboxApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMailboxList: build.query<GetMailboxListApiResponse, GetMailboxListApiArg>({
				query: (routeParams) => {
					let url = '/mock-api/mailbox/mails/';

					if (routeParams) {
						if (routeParams.folderHandle) {
							url += routeParams.folderHandle;
						}

						if (routeParams.labelHandle) {
							url += `labels/${routeParams.labelHandle}`;
						}

						if (routeParams.filterHandle) {
							url += `filters/${routeParams.filterHandle}`;
						}
					}

					return {
						url
					};
				},
				providesTags: ['mailbox_list']
			}),
			getMailboxMail: build.query<GetMailboxMailApiResponse, GetMailboxMailApiArg>({
				query: (mailId) => ({
					url: `/mock-api/mailbox/mails/mail/${mailId}`
				}),
				providesTags: ['mailbox_mail']
			}),
			applyMailboxMailAction: build.mutation<ApplyMailboxMailActionApiResponse, ApplyMailboxMailActionApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/actions`,
					method: 'POST',
					data: queryArg
				}),
				invalidatesTags: ['mailbox_list', 'mailbox_mail']
			}),
			createMailboxMail: build.mutation<CreateMailboxMailApiResponse, CreateMailboxMailApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/${queryArg.folderSlug}`,
					method: 'POST',
					data: queryArg.mail
				}),
				invalidatesTags: ['mailbox_list']
			}),
			getMailboxMailListByLabel: build.query<
				GetMailboxMailListByLabelApiResponse,
				GetMailboxMailListByLabelApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/labels/${queryArg.labelSlug}`
				}),
				providesTags: ['mailbox_list']
			}),
			getMailboxMailListByFilter: build.query<
				GetMailboxMailListByFilterApiResponse,
				GetMailboxMailListByFilterApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/filters/${queryArg.filterSlug}`
				}),
				providesTags: ['mailbox_list']
			}),
			getMailboxFilterList: build.query<GetMailboxFilterListApiResponse, GetMailboxFilterListApiArg>({
				query: () => ({ url: `/mock-api/mailbox/filters` }),
				providesTags: ['mailbox_filters']
			}),
			getMailboxLabelList: build.query<GetMailboxLabelListApiResponse, GetMailboxLabelListApiArg>({
				query: () => ({ url: `/mock-api/mailbox/labels` }),
				providesTags: ['mailbox_labels']
			}),
			updateMailboxLabel: build.mutation<UpdateMailboxLabelApiResponse, UpdateMailboxLabelApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/labels/${queryArg.labelSlug}`,
					method: 'PUT',
					data: queryArg.label
				}),
				invalidatesTags: ['mailbox_label', 'mailbox_labels']
			}),
			getMailboxFolderList: build.query<GetMailboxFolderListApiResponse, GetMailboxFolderListApiArg>({
				query: () => ({ url: `/mock-api/mailbox/folders` }),
				providesTags: ['mailbox_folders']
			})
		}),
		overrideExisting: false
	});

export default MailboxApi;

type RouteParams = {
	folderHandle?: string;
	labelHandle?: string;
	filterHandle?: string;
	mailId?: string;
};

export type GetMailboxListApiResponse = /** status 200 OK */ MailboxMail[];
export type GetMailboxListApiArg = RouteParams;

export type ApplyMailboxMailActionApiResponse = unknown;
export type ApplyMailboxMailActionApiArg = {
	type: MailboxAction;
	ids: string[];
	value: boolean | string | string[];
};

export type CreateMailboxMailApiResponse = unknown;
export type CreateMailboxMailApiArg = {
	/** folder slug */
	folderSlug: string;
	mail: MailboxMail;
};
export type GetMailboxMailListByLabelApiResponse = /** status 200 OK */ MailboxMail[];
export type GetMailboxMailListByLabelApiArg = {
	/** label slug */
	labelSlug: string;
};

export type GetMailboxMailApiResponse = MailboxMail;
export type GetMailboxMailApiArg = string;

export type GetMailboxMailListByFilterApiResponse = /** status 200 OK */ MailboxMail[];
export type GetMailboxMailListByFilterApiArg = {
	/** filter slug */
	filterSlug: string;
};

export type GetMailboxFilterListApiResponse = /** status 200 OK */ MailboxFilter[];
export type GetMailboxFilterListApiArg = void;

export type GetMailboxLabelListApiResponse = /** status 200 OK */ MailboxLabel[];
export type GetMailboxLabelListApiArg = void;

export type UpdateMailboxLabelApiResponse = /** status 200 OK */ MailboxLabel;
export type UpdateMailboxLabelApiArg = {
	/** label slug */
	labelSlug: string;
	label: MailboxLabel;
};

export type GetMailboxFolderListApiResponse = /** status 200 OK */ MailboxFolder[];
export type GetMailboxFolderListApiArg = void;

export type MailboxMailAttachment = {
	type: string;
	name: string;
	size: number;
	preview: string;
	downloadUrl: string;
};

export type MailboxMail = {
	id: string;
	type: string;
	from: {
		avatar: string;
		contact: string;
		email: string;
	};
	to: string;
	cc?: string[];
	bcc?: string[];
	date: string;
	subject: string;
	content: string;
	attachments: MailboxMailAttachment[];
	starred: boolean;
	important: boolean;
	unread: boolean;
	folder: string;
	labels: string[];
};
export type MailboxFilter = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};
export type MailboxLabel = {
	id?: string;
	title?: string;
	slug?: string;
	color?: LabelColorsType;
};
export type MailboxFolder = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};

export type MailboxAction =
	| 'important'
	| 'starred'
	| 'unread'
	| 'folder'
	| 'labels'
	| 'label'
	| 'sent'
	| 'drafts'
	| 'trash'
	| 'spam'
	| 'all';

export const {
	useGetMailboxListQuery,
	useApplyMailboxMailActionMutation,
	useCreateMailboxMailMutation,
	useGetMailboxMailListByLabelQuery,
	useGetMailboxMailListByFilterQuery,
	useGetMailboxFilterListQuery,
	useGetMailboxLabelListQuery,
	useUpdateMailboxLabelMutation,
	useGetMailboxFolderListQuery,
	useGetMailboxMailQuery
} = MailboxApi;

export type MailboxApiType = {
	[MailboxApi.reducerPath]: ReturnType<typeof MailboxApi.reducer>;
};

export const selectMailList = (routeParams: RouteParams) => (state: AppRootStateType) =>
	MailboxApi.endpoints.getMailboxList.select(routeParams)(state)?.data ?? [];

export const selectFolderList = (state: AppRootStateType) =>
	MailboxApi.endpoints.getMailboxFolderList.select()(state)?.data ?? [];

export const selectLabelList = (state: AppRootStateType) =>
	MailboxApi.endpoints.getMailboxLabelList.select()(state)?.data ?? [];

export const selectLabelById = (id: string) =>
	createSelector([selectLabelList], (labels) => {
		return _.find(labels, { id });
	});

export const selectFilterList = (state: AppRootStateType) =>
	MailboxApi.endpoints.getMailboxLabelList.select()(state)?.data ?? [];

export const selectSpamFolderId = createSelector([selectFolderList], (folders) => {
	return _.find(folders, { slug: 'spam' })?.id;
});

export const selectTrashFolderId = createSelector([selectFolderList], (folders) => {
	return _.find(folders, { slug: 'trash' })?.id;
});

export const selectMailsTitle = (routeParams: RouteParams) =>
	createSelector([selectFolderList, selectLabelList, selectFilterList], (folders, labels, filters) => {
		let title = '';

		if (routeParams.folderHandle) {
			title = _.find(folders, { slug: routeParams.folderHandle })?.title;
		}

		if (routeParams.labelHandle) {
			title = _.find(labels, { slug: routeParams.labelHandle })?.title;
		}

		if (routeParams.filterHandle) {
			title = _.find(filters, { slug: routeParams.filterHandle })?.title;
		}
		return title;
	});

// export const selectSelectedMailIds = (state: AppRootStateType) => state.mailboxApp?.mails.selectedMailIds;
