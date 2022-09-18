import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store/index';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';

interface MessageState {
	state: boolean;
	options?: SnackbarProps;
}

const initialState = {
	state: null,
	options: {
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi',
		variant: null
	}
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		showMessage: (state, action: PayloadAction<MessageState['options']>) => {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage: (state) => {
			state.state = null;
		}
	}
});

export const { hideMessage, showMessage } = messageSlice.actions;

export const selectFuseMessageState = (state: RootState) => state.fuse.message.state;

export const selectFuseMessageOptions = (state: RootState) => state.fuse.message.options;

export default messageSlice.reducer;
