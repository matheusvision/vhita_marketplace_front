import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'app/store/index';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	rejectValue: string;
	extra: { s: string; n: number };
}>();

export default createAppAsyncThunk;
