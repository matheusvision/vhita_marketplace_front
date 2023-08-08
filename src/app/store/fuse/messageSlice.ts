import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store/index';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import { FuseMessageVariantType } from '@fuse/core/FuseMessage/FuseMessage';

type initialStateProps = {
	state: boolean;
	options?: Pick<SnackbarProps, 'anchorOrigin' | 'autoHideDuration' | 'message'> & {
		variant?: FuseMessageVariantType;
	};
};

const initialState: initialStateProps = {
	state: null,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		showMessage: (state, action: PayloadAction<initialStateProps['options']>) => {
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
