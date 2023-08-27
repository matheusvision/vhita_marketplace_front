import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/index';

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

type AppRootState = RootState<typeof stateSlice>;

export const selectQuickPanelState = (state: AppRootState) => state.quickPanel.state;

export default stateSlice.reducer;
