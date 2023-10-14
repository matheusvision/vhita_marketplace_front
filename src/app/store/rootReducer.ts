import { combineReducers, ReducersMapObject, Slice } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import i18nSlice from './i18nSlice';
import generateReducersFromSlices from './generateReducersFromSlices';
import fuseSlices from './fuse';

/**
 * Creates a reducer function that combines the provided reducers with the async reducers.
 */
const createReducer = (asyncReducers: ReducersMapObject) =>
	combineReducers({
		...generateReducersFromSlices([...fuseSlices, i18nSlice, userSlice] as Slice[]),
		...asyncReducers
	} as ReducersMapObject);

/* Reset the redux store when user logged out */
/**
	if (action.type === 'user/userLoggedOut') {
		// state = undefined;
	}
	return combinedReducer(state, action);
*/

export default createReducer;
