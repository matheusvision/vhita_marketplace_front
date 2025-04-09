import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import {getAdsMeta, getCopies, metaTokenIsValid, metaAuthUrl, metaGetAccessToken, getCampaigns, getCampaignsHistory, getMetas} from './metrics.actions.js'

const initialState = {
	ads: [],
	copies_local: [],
	metaAuthUrl: null,
	metaTokenIsValid: null,
	metaToken: null,
	campaigns_history_local: [],
	campaigns_local: [],
	metas_local: []
};
/**
 * The slice for the contacts.
 */
export const campaignsAppSlice = createSlice({
	name: 'campaignsApp',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getAdsMeta.fulfilled, (state, action) => {
			state.ads = action.payload
		});
		builder.addCase(metaTokenIsValid.fulfilled, (state, action) => {
			state.metaTokenIsValid = action.payload.valid
		});
		builder.addCase(metaAuthUrl.fulfilled, (state, action) => {
			state.metaAuthUrl = action.payload.url
		});
		builder.addCase(metaGetAccessToken.fulfilled, (state, action) => {
			state.metaToken = action.payload.token ? action.payload.token : {error: true}
		});
		builder.addCase(getCopies.fulfilled, (state, action) => {
			state.copies_local = action.payload
		});
		builder.addCase(getMetas.fulfilled, (state, action) => {
			state.metas_local = action.payload
		});
		builder.addCase(getCampaigns.fulfilled, (state, action) => {
			state.campaigns_local = action.payload
		});
		builder.addCase(getCampaignsHistory.fulfilled, (state, action) => {
			state.campaigns_history_local = action.payload
		});

	},
	selectors: {
		copiesLocalData: (state) => state.copies_local,
		metasLocalData: (state) => state.metas_local,
		campaignsLocalData: (state) => state.campaigns_local,
		campaignsHistoryLocalData: (state) => state.campaigns_history_local,
		adsData: (state) => state.ads,
		MetaTokenIsValid: (state) => state.metaTokenIsValid,
		MetaAuthUrl: (state) => state.metaAuthUrl,
		MetaToken: (state) => state.metaToken,
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(campaignsAppSlice);
const injectedSlice = campaignsAppSlice.injectInto(rootReducer);
export const { copiesLocalData, metasLocalData, campaignsLocalData, campaignsHistoryLocalData, adsData, MetaTokenIsValid, MetaAuthUrl, MetaToken } = injectedSlice.selectors;
export default campaignsAppSlice.reducer;
