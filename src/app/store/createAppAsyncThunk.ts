import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, RootStateType } from 'app/store/types';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootStateType;
	dispatch: AppDispatchType;
	rejectValue: string;
	extra: { s: string; n: number };
}>();

export default createAppAsyncThunk;
