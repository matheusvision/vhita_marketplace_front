import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogProps } from '@mui/material/Dialog/Dialog';
import { RootState } from 'app/store/index';

type initialStateProps = {
	state: boolean;
	options?: Pick<DialogProps, 'open' | 'children'>;
};

const initialState: initialStateProps = {
	state: false,
	options: {
		open: false,
		children: 'Hi'
	}
};

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<initialStateProps['options']>) => {
			state.state = true;
			state.options = action.payload;
		},
		closeDialog: (state) => {
			state.state = false;
		}
	}
});

export const { closeDialog } = dialogSlice.actions;

export const selectFuseDialogState = (state: RootState) => state.fuse.dialog.state;

export const selectFuseDialogOptions = (state: RootState) => state.fuse.dialog.options;

export default dialogSlice.reducer;
