import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'app/configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

export const appendNavigationItem = (item: any, parentId: any) => (dispatch: any, getState: any) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item: any, parentId: any) => (dispatch: any, getState: any) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id: any, item: any) => (dispatch: any, getState: any) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id: any) => (dispatch: any, getState: any) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state) => state.fuse.navigation);

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation: navigationAdapter.setAll,
		resetNavigation: (state, action) => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state: any) => state.user.role;

export const selectNavigation = createSelector(
	[selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
	(navigation, language, userRole) => {
		function setTranslationValues(data: any) {
			// loop through every object in the array
			return data.map((item: any) => {
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
				filterRecursively(navigation, (item: any) => FuseUtils.hasPermission(item.auth, userRole))
			)
		);
	}
);

function filterRecursively(arr: any, predicate: any) {
	return arr.filter(predicate).map((item: any) => {
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
