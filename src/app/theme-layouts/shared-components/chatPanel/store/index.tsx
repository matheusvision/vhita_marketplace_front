import chatList from './chatListSlice';
import chat from './chatMessagesSlice';
import contacts from './contactsSlice';
import user from './userSlice';
import state from './stateSlice';

/**
 * Chat panel slices.
 */
const slices = [user, contacts, chatList, chat, state];

export default slices;
