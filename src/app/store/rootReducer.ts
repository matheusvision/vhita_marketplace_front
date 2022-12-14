import { Action, combineReducers, ReducersMapObject } from '@reduxjs/toolkit';
import { RootState } from 'app/store/index';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './user/userSlice';

const createReducer = (asyncReducers: ReducersMapObject) => (state: RootState, action: Action) => {
	const combinedReducer = combineReducers({
		fuse,
		i18n,
		user,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'user/userLoggedOut') {
		// state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
