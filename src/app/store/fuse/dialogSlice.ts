import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
	name: 'dialog',
	initialState: {
		state: false,
		options: {
			children: 'Hi'
		}
	},
	reducers: {
		openDialog: (state, action) => {
			state.state = true;
			state.options = action.payload;
		},
		closeDialog: (state, action) => {
			state.state = false;
		}
	}
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectFuseDialogState = ({ fuse }: any) => fuse.dialog.state;

export const selectFuseDialogOptions = ({ fuse }: any) => fuse.dialog.options;

export default dialogSlice.reducer;
