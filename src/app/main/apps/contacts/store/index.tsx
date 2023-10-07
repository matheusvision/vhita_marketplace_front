import { RootStateType } from 'app/store/types';
import tags, { tagsSliceType } from './tagsSlice';
import contacts, { contactsSliceType } from './contactsSlice';
import countries, { countriesSliceType } from './countriesSlice';
import contact, { contactSliceType } from './contactSlice';

/**
 * The Contacts App slices.
 */
const slices = [tags, countries, contacts, contact];

export default slices;

export type AppRootStateType = RootStateType<[contactsSliceType, tagsSliceType, countriesSliceType, contactSliceType]>;
