import { RootState } from 'app/store/index';
import tags, { tagsSliceType } from './tagsSlice';
import contacts, { contactsSliceType } from './contactsSlice';
import countries, { countriesSliceType } from './countriesSlice';
import contact, { contactSliceType } from './contactSlice';

const slices = [tags, countries, contacts, contact];

export default slices;

export type AppRootState = RootState<[contactsSliceType, tagsSliceType, countriesSliceType, contactSliceType]>;
