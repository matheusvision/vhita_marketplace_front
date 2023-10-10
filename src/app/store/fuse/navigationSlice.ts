import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import navigationConfig from 'app/configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';
import { AppThunkType, RootStateType } from 'app/store/types';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';
import { PartialDeep } from 'type-fest';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';

const navigationAdapter = createEntityAdapter<FuseNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState();

const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

/**
 * Redux Thunk actions related to the navigation store state
 */

/**
 */
export const appendNavigationItem =
	(item: FuseNavItemType, parentId?: string): AppThunkType =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());
		dispatch(setNavigation(FuseUtils.appendNavItem(navigation, FuseNavItemModel(item), parentId)));
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: FuseNavItemType, parentId?: string): AppThunkType =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.prependNavItem(navigation, FuseNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<FuseNavItemType>): AppThunkType =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunkType =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: RootStateType) => state.fuse.navigation);

/**
 * The navigation slice
 */
const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation: (state, action: PayloadAction<FuseNavigationType>) =>
			navigationAdapter.setAll(state, action.payload),
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state: RootStateType) => state.user.role;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectCurrentLanguageId, getUserRole],
	(navigation, language, userRole) => {
		function setTranslationValues(data: FuseNavigationType) {
			// loop through every object in the array
			return data.map((item) => {
				if (item.translate && item.title) {
					item.title = i18next.t(`navigation:${item.translate}`);
				}

				// see if there is a children node
				if (item.children) {
					// run this function recursively on the children array
					item.children = setTranslationValues(item.children);
				}
				return item;
			});
		}

		return setTranslationValues(
			_.merge(
				[],
				filterRecursively(navigation, (item) => FuseUtils.hasPermission(item?.auth, userRole))
			)
		);
	}
);

function filterRecursively(arr: FuseNavigationType, predicate: (item: FuseNavItemType) => boolean) {
	return arr.filter(predicate).map((item) => {
		item = { ...item };
		if (item.children) {
			item.children = filterRecursively(item.children, predicate);
		}
		return item;
	});
}

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
	FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
