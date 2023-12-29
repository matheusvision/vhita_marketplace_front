import { createSlice } from '@reduxjs/toolkit';
import { AppRootStateType } from '.';

export const selectSearchText = (state: AppRootStateType) => state.mailboxApp?.searchText;

const initialState = '';

/**
 * The Contacts App Contacts slice.
 */
export const searchTextSlice = createSlice({
	name: 'mailboxApp/searchText',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => action.payload as string,
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	}
});

export const { setSearchText } = searchTextSlice.actions;

export type searchTextSliceType = typeof searchTextSlice;

const searchTextReducer = searchTextSlice.reducer;

export default searchTextReducer;
