import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';

/**
 * The root reducer for the Fuse Redux store.
 */

const slices = [navigation, settings, navbar, message, dialog];

export default slices;
