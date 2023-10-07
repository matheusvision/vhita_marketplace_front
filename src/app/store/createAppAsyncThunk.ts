import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, RootStateType } from 'app/store/types';

/**
 * The type definition for the options object passed to `createAsyncThunk.withTypes`.
 */
type CreateAsyncThunkOptions = {
	state: RootStateType;
	dispatch: AppDispatchType;
	rejectValue: string;
	extra: { s: string; n: number };
};

/**
 * Creates an async thunk with the specified types.
 * @returns A function that can be used to create an async thunk.
 */
const createAppAsyncThunk = createAsyncThunk.withTypes<CreateAsyncThunkOptions>();

export default createAppAsyncThunk;
