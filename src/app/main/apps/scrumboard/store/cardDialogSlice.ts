import { createSlice } from '@reduxjs/toolkit';
import { AppRootStateType } from '.';
import { ScrumboardCard } from '../ScrumboardApi';

const initialState: {
	dialogOpen: boolean;
	data: ScrumboardCard | null;
} = {
	dialogOpen: false,
	data: null
};

/**
 * The Scrumboard Card Dialog Slice.
 */
export const cardDialogSlice = createSlice({
	name: 'scrumboardApp/cardDialog',
	initialState,
	reducers: {
		openCardDialog: (state, action) => {
			state.dialogOpen = true;
			state.data = action.payload as ScrumboardCard;
		},
		closeCardDialog: (state) => {
			state.dialogOpen = false;
			state.data = null;
		}
	}
});

export const data = (state: AppRootStateType) => state.scrumboardApp.cardDialog.data;

export const { openCardDialog, closeCardDialog } = cardDialogSlice.actions;

export const selectCardDialogOpen = (state: AppRootStateType) => state.scrumboardApp.cardDialog.dialogOpen;

export const selectCardData = (state: AppRootStateType) => state.scrumboardApp.cardDialog.data;

export type CardSliceType = typeof cardDialogSlice;

export default cardDialogSlice.reducer;
