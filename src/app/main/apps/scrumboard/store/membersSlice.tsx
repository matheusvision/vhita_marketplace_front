import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { MembersType, MemberType } from '../model/MemberModel';

type DynamicAppRootState = RootState<MembersSliceType>;

/**
 * Get Members
 */
export const getMembers = createAppAsyncThunk<MembersType>('scrumboardApp/members/getMembers', async () => {
	const response = await axios.get(`/api/scrumboard/members`);

	const data = (await response.data) as MembersType;

	return data;
});

const membersAdapter = createEntityAdapter<MemberType>({});

export const { selectAll: selectMembers, selectById } = membersAdapter.getSelectors(
	(state: DynamicAppRootState) => state.scrumboardApp.members
);

const membersSlice = createSlice({
	name: 'scrumboardApp/members',
	initialState: membersAdapter.getInitialState({}),
	reducers: {
		resetMembers: () => {}
	},

	extraReducers: (builder) => {
		builder.addCase(getMembers.fulfilled, (state, action) => membersAdapter.setAll(state, action.payload));
	}
});

export const { resetMembers } = membersSlice.actions;

export const selectMemberById = (id: MemberType['id']) => (state: DynamicAppRootState) => selectById(state, id);

export type MembersSliceType = typeof membersSlice;

export default membersSlice;
