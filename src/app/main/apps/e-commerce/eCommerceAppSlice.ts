import { WithSlice, createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { searchText: '' };

/**
 * The E-commerce App slice.
 */
export const eCommerceAppSlice = createSlice({
	name: 'eCommerceApp',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: `${event?.target?.value}` || initialState,
				meta: undefined,
				error: null
			})
		},
		resetSearchText: (state) => {
			state.searchText = initialState.searchText;
		}
	},
	selectors: {
		selectSearchText: (state) => state.searchText
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(eCommerceAppSlice);
const injectedSlice = eCommerceAppSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof eCommerceAppSlice> {}
}

export const { setSearchText, resetSearchText } = eCommerceAppSlice.actions;

export type searchTextSliceType = typeof eCommerceAppSlice;

export const { selectSearchText } = injectedSlice.selectors;

const searchTextReducer = eCommerceAppSlice.reducer;

export default searchTextReducer;
