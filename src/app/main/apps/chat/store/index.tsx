import chatList from './chatListSlice';
import chat from './chatMessagesSlice';
import contacts from './contactsSlice';
import user from './userSlice';

/**
 * The slices of the chat app.
 */
const slices = [user, contacts, chatList, chat];

export default slices;
