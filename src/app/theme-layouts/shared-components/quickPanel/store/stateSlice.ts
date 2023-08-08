import { createSlice } from '@reduxjs/toolkit';
import { RootStateWith } from 'app/store/index';

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

export const selectQuickPanelState = (state: RootStateWith<typeof stateSlice>) => state.quickPanel.state;

export default stateSlice.reducer;
