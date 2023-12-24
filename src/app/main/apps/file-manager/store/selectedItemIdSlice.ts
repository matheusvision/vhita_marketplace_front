import { createSlice } from '@reduxjs/toolkit';
import { AppRootStateType } from './index';

const initialState: string | null = null;

/**
 * The File Manager selected item id.
 */
export const selectedItemIdSlice = createSlice({
	name: 'fileManagerApp/selectedItemId',
	initialState,
	reducers: {
		setSelectedItemId: (state, action) => action.payload as string,
		resetSelectedItemId: () => null
	}
});

export const selectSelectedItemId = (state: AppRootStateType) => state?.fileManagerApp.selectedItemId;

export const { setSelectedItemId, resetSelectedItemId } = selectedItemIdSlice.actions;

export type selectedItemIdSliceType = typeof selectedItemIdSlice;

export default selectedItemIdSlice.reducer;
