import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { PartialDeep } from 'type-fest';
import { DropResult } from 'react-beautiful-dnd';
import reorder, { reorderQuoteMap } from './reorder';
import { newList, removeList } from './listsSlice';
import { newCard } from './cardsSlice';
import { removeCard } from './cardSlice';
import { BoardType } from '../types/BoardType';
import { LabelType, LabelsType } from '../types/LabelType';

type AppRootStateType = RootStateType<[BoardSliceType]>;

/**
 * Get Board
 */
export const getBoard = createAppAsyncThunk<BoardType, string>(
	'scrumboardApp/board/get',
	async (boardId, { dispatch }) => {
		try {
			const response = await axios.get(`/api/scrumboard/boards/${boardId}`);

			const data = (await response.data) as BoardType;

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				dispatch(
					showMessage({
						message: error.response.data as string,
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right'
						}
					})
				);
			}

			history.push({
				pathname: '/apps/scrumboard/board'
			});

			return null;
		}
	}
);

/**
 * Update Board
 */
export const updateBoard = createAppAsyncThunk<BoardType, PartialDeep<BoardType>>(
	'scrumboardApp/board/update',
	async (newData, { getState }) => {
		const AppState = getState() as AppRootStateType;
		const { board } = AppState.scrumboardApp;

		const response = await axios.put(`/api/scrumboard/boards/${board.id}`, newData);

		const data = (await response.data) as BoardType;

		return data;
	}
);

/**
 * Reorder Board List
 */
export const reorderList = createAppAsyncThunk<BoardType, DropResult>(
	'scrumboardApp/board/reorderList',
	async ({ source, destination }, { dispatch, getState }) => {
		const AppState = getState() as AppRootStateType;
		const { board } = AppState.scrumboardApp;
		const ordered = reorder(_.merge([], board.lists), source.index, destination.index);

		const response = await axios.put(`/api/scrumboard/boards/${board.id}`, { lists: ordered });

		const data = (await response.data) as BoardType;

		dispatch(
			showMessage({
				message: 'List Order Saved',
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
 * Reorder Board Card
 */
export const reorderCard = createAppAsyncThunk<BoardType, DropResult>(
	'scrumboardApp/board/reorderCard',
	async ({ source, destination }, { dispatch, getState }) => {
		const AppState = getState() as AppRootStateType;
		const { board } = AppState.scrumboardApp;

		const ordered = reorderQuoteMap(_.merge([], board.lists), source, destination);

		const response = await axios.put(`/api/scrumboard/boards/${board.id}`, { lists: ordered });

		const data = (await response.data) as BoardType;

		dispatch(
			showMessage({
				message: 'Card Order Saved',
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
 * Delete Board
 */
export const deleteBoard = createAppAsyncThunk<string, string>(
	'scrumboardApp/board/delete',
	async (params, { getState }) => {
		const AppState = getState() as AppRootStateType;

		const board = AppState.scrumboardApp.board as BoardType;

		const response = await axios.delete(`/api/scrumboard/boards/${board.id}`);

		history.push({
			pathname: '/apps/scrumboard/board'
		});

		const data = (await response.data) as string;

		return data;
	}
);

const initialState: BoardType = null;

const boardSlice = createSlice({
	name: 'scrumboardApp/board',
	initialState,
	reducers: {
		resetBoard: () => null,
		addLabel: (state, action) => {
			state.labels = [...state.labels, action.payload as LabelType] as LabelsType;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBoard.fulfilled, (state, action) => action.payload)
			.addCase(updateBoard.fulfilled, (state, action) => action.payload)
			.addCase(reorderList.fulfilled, (state, action) => action.payload)
			.addCase(reorderCard.fulfilled, (state, action) => action.payload)
			.addCase(deleteBoard.fulfilled, (state) => {
				// eslint-disable-next-line unused-imports/no-unused-vars
				state = initialState;
			})
			.addCase(removeCard.fulfilled, (state, action) => {
				const cardId = action.payload;

				state.lists = state.lists.map((list) => ({
					...list,
					cards: _.reject(list.cards, (id) => id === cardId)
				}));
			})
			.addCase(removeList.fulfilled, (state, action) => {
				const listId = action.payload;

				state.lists = _.reject(state.lists, { id: listId });
			})
			.addCase(newList.fulfilled, (state, action) => {
				state.lists = [...state.lists, { id: action.payload.id, cards: [] }];
			})
			.addCase(newCard.fulfilled, (state, action) => {
				const cardData = action.payload;
				state.lists = state.lists.map((list) =>
					list.id === cardData.listId ? { ...list, cards: [...list.cards, cardData.id] } : list
				);
			});
	}
});

export const { resetBoard, addLabel } = boardSlice.actions;

export const selectBoard = (state: AppRootStateType) => state.scrumboardApp.board;

export type BoardSliceType = typeof boardSlice;

export default boardSlice;
