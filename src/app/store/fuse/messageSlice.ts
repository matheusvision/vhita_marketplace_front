import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import { FuseMessageVariantType } from '@fuse/core/FuseMessage/FuseMessage';

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
	state: boolean;
	options?: Pick<SnackbarProps, 'anchorOrigin' | 'autoHideDuration' | 'message'> & {
		variant?: FuseMessageVariantType;
	};
};

/**
 * The initial state of the message slice.
 */
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

/**
 * The Message slice.
 */
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

export const selectFuseMessageState = (state: RootStateType) => state.fuse.message.state;

export const selectFuseMessageOptions = (state: RootStateType) => state.fuse.message.options;

export default messageSlice.reducer;
