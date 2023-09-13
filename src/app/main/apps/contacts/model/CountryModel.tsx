import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type CountryType = {
	id: string;
	iso: string;
	name: string;
	code: string;
	flagImagePos: string;
};

export type CountriesType = CountryType[];

const CountryModel = (data: PartialDeep<CountryType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		iso: '',
		name: '',
		code: '',
		flagImagePos: ''
	});

export default CountryModel;
