import mockApi from '../mock-api.json';
import mock from '../mock';
import { Country } from '../../app/main/apps/contacts/ContactsApi';

const countriesApi = mockApi.components.examples.countries.value as Country[];

mock.onGet('/countries').reply(() => {
	return [200, countriesApi];
});
