import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

const initialState: DialogProps = {
	open: false,
	children: null
};

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.open = true;
			state.children = action.payload as ReactNode;
		},
		closeDialog: () => initialState
	}
});

export const { closeDialog, openDialog } = dialogSlice.actions;

export const selectFuseDialogState = (state: RootStateType) => state.fuse.dialog.open;

export const selectFuseDialogProps = (state: RootStateType) => state.fuse.dialog;

export default dialogSlice.reducer;
