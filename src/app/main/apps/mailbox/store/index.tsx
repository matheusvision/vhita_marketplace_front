import filters from './filtersSlice';
import folders from './foldersSlice';
import labels from './labelsSlice';
import mail from './mailSlice';
import mails from './mailsSlice';

/**
 * The Mailbox App slices.
 */
const slices = [mails, mail, folders, labels, filters];

export default slices;
