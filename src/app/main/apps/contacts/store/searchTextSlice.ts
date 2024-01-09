import { createSlice } from '@reduxjs/toolkit';
import { AppRootStateType } from '.';

export const selectSearchText = (state: AppRootStateType) => state.contactsApp?.searchText;

const initialState = '';

/**
 * The Contacts App Contacts slice.
 */
export const searchTextSlice = createSlice({
	name: 'contactsApp/searchText',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => action.payload as string,
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: `${event?.target?.value}` || initialState,
				meta: undefined,
				error: null
			})
		},
		resetSearchText: () => initialState
	}
});

export const { setSearchText, resetSearchText } = searchTextSlice.actions;

export type searchTextSliceType = typeof searchTextSlice;

const searchTextReducer = searchTextSlice.reducer;

export default searchTextReducer;
