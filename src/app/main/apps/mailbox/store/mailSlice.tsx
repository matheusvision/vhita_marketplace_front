import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { getMails } from './mailsSlice';
import { MailType } from '../types/MailType';
import RouteParamsType from '../types/RouteParamsType';

export type AppRootStateType = RootStateType<mailSliceType>;

/**
 * Get mail from server
 */
export const getMail = createAppAsyncThunk<MailType, RouteParamsType>(
	'mailboxApp/mail/getMail',
	async (routeParams) => {
		let url = '/api/mailbox/mails/';
		if (routeParams.folderHandle) {
			url += `${routeParams.folderHandle}/${routeParams.mailId}`;
		}

		if (routeParams.labelHandle) {
			url += `labels/${routeParams.labelHandle}/${routeParams.mailId}`;
		}

		if (routeParams.filterHandle) {
			url += `filters/${routeParams.filterHandle}/${routeParams.mailId}`;
		}

		try {
			const response = await axios.get(url);

			const data = (await response.data) as MailType;

			return data;
		} catch (error) {
			history.push({ pathname: `/apps/mailbox` });

			return null;
		}
	}
);

const initialState: MailType = null;

/**
 * The Mailbox App mail slice.
 */
const mailSlice = createSlice({
	name: 'mailboxApp/mail',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMail.fulfilled, (state, action) => action.payload)
			.addCase(getMails.fulfilled, (state, action) => {
				const mails = action.payload.data;

				if (!state) {
					return null;
				}

				const mail = _.find(mails, { id: state.id });

				return mail || null;
			});
	}
});

export const selectMail = (state: AppRootStateType) => state.mailboxApp.mail;

export type mailSliceType = typeof mailSlice;

export default mailSlice;
