import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { FileManagerItemType, FileManagerItemsType } from '../model/FileManagerItemModel';

type ItemResponseType = { items: FileManagerItemsType; path: ItemPathType };

export const getItems = createAppAsyncThunk<ItemResponseType, string>(
	'fileManagerApp/items/getItems',
	async (folderId) => {
		const response = await axios.get(`/api/file-manager/${folderId}`);

		const data = (await response.data) as ItemResponseType;

		return data;
	}
);

const itemsAdapter = createEntityAdapter<FileManagerItemType>({});

type ItemPathType = { id: string; name: string }[];

const initialState = itemsAdapter.getInitialState<{
	selectedItemId: string | null;
	path: ItemPathType;
}>({
	selectedItemId: null,
	path: []
});

export const {
	selectAll: selectItems,
	selectEntities: selectItemsEntities,
	selectById
} = itemsAdapter.getSelectors((state: AppRootState) => state.fileManagerApp.items);

const itemsSlice = createSlice({
	name: 'fileManagerApp/items',
	initialState,
	reducers: {
		setSelectedItem: (state, action) => {
			state.selectedItemId = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getItems.fulfilled, (state, action) => {
			const { items, path }: ItemResponseType = action.payload;
			itemsAdapter.setAll(state, items);
			state.path = path;
			state.selectedItemId = null;
		});
	}
});

export type AppRootState = RootState<typeof itemsSlice>;

export const selectFolders = createSelector([selectItems], (items) => {
	return items.filter((item) => item.type === 'folder');
});

export const selectFiles = createSelector([selectItems], (items) => {
	return items.filter((item) => item.type !== 'folder');
});

export const selectSelectedItemId = (state: AppRootState) => state.fileManagerApp.items.selectedItemId;

export const selectSelectedItem = (state: AppRootState) => selectById(state, state.fileManagerApp.items.selectedItemId);

export const selectPath = (state: AppRootState) => state.fileManagerApp.items.path;

export const { setSelectedItem } = itemsSlice.actions;

export const selectItemByIds = (id: FileManagerItemType['id']) => (state: AppRootState) => selectById(state, id);

export default itemsSlice.reducer;
