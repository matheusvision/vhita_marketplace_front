import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFolders = createAsyncThunk('mailboxApp/folders/getFolders', async () => {
  const response = await axios.get('/api/mailbox/folders');
  const data = await response.data;

  return data;
});

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFolderById } =
  foldersAdapter.getSelectors((state) => state.mailboxApp.folders);

const foldersSlice = createSlice({
  name: 'mailboxApp/folders',
  initialState: foldersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getFolders.fulfilled]: foldersAdapter.setAll,
  },
});

export default foldersSlice.reducer;
