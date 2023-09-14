import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import { getMails } from './mailsSlice';
import { MailType } from '../model/MailModel';
import RouteParamsType from '../type/RouteParamsType';

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

export type AppRootState = RootState<typeof mailSlice>;

export const selectMail = (state: AppRootState) => state.mailboxApp.mail;

export default mailSlice.reducer;
