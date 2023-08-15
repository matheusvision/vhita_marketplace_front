import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import navigationConfig from 'app/configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';
import { AppThunk, RootState } from 'app/store/index';
import { FuseNavigationType, FuseNavItemType } from '@fuse/core/FuseNavigation';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';

const navigationAdapter = createEntityAdapter<FuseNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState();

const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

export const appendNavigationItem =
	(item: FuseNavItemType, parentId: string): AppThunk =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());
		dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
	};

export const prependNavigationItem =
	(item: FuseNavItemType, parentId: string): AppThunk =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));

		return Promise.resolve();
	};

export const updateNavigationItem =
	(id: string, item: FuseNavItemType): AppThunk =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: RootState) => state.fuse.navigation);

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

const getUserRole = (state: RootState) => state.user.role;

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
