import { createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootState } from 'app/store/index';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { BoardSliceType } from './boardSlice';
import { CardType } from '../model/CardModel';

type DynamicAppRootState = RootState<[CardSliceType, BoardSliceType]>;

/**
 * Update Card
 */
export const updateCard = createAppAsyncThunk<CardType, CardType>(
	'scrumboardApp/card/update',
	async (newData, { dispatch, getState }) => {
		const AppState = getState() as DynamicAppRootState;
		const { card, board } = AppState.scrumboardApp;

		const response = await axios.put(`/api/scrumboard/boards/${board.id}/cards/${card.data.id}`, newData);

		const data = (await response.data) as CardType;

		dispatch(
			showMessage({
				message: 'Card Saved',
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);

		return data;
	}
);

/**
 * Remove Card
 */
export const removeCard = createAppAsyncThunk<string>(
	'scrumboardApp/card/removeCard',
	async (_params, { dispatch, getState }) => {
		const AppState = getState() as DynamicAppRootState;
		const { card, board } = AppState.scrumboardApp;

		const response = await axios.delete(`/api/scrumboard/boards/${board.id}/cards/${card.data.id}`);

		const data = (await response.data) as string;

		dispatch(closeCardDialog());

		return data;
	}
);

const initialState: {
	dialogOpen: boolean;
	data: CardType;
} = {
	dialogOpen: false,
	data: null
};

const cardSlice = createSlice({
	name: 'scrumboardApp/card',
	initialState,
	reducers: {
		openCardDialog: (state, action) => {
			state.dialogOpen = true;
			state.data = action.payload as CardType;
		},
		closeCardDialog: (state) => {
			state.dialogOpen = false;
			state.data = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(updateCard.fulfilled, (state, action) => {
			state.data = action.payload;
		});
	}
});

export const data = (state: DynamicAppRootState) => state.scrumboardApp.card.data;

export const { openCardDialog, closeCardDialog } = cardSlice.actions;

export const selectCardDialogOpen = (state: DynamicAppRootState) => state.scrumboardApp.card.dialogOpen;

export const selectCardData = (state: DynamicAppRootState) => state.scrumboardApp.card.data;

export type CardSliceType = typeof cardSlice;

export default cardSlice;
