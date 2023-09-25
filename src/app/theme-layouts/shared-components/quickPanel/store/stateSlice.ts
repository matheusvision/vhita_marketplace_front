import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/index';

type AppRootState = RootState<stateSliceType>;

const stateSlice = createSlice({
	name: 'quickPanel/state',
	initialState: false,
	reducers: {
		toggleQuickPanel: (state) => !state,
		openQuickPanel: () => true,
		closeQuickPanel: () => false
	}
});

export const { toggleQuickPanel, openQuickPanel, closeQuickPanel } = stateSlice.actions;

export const selectQuickPanelState = (state: AppRootState) => state.quickPanel.state;

export type stateSliceType = typeof stateSlice;

export default stateSlice;
