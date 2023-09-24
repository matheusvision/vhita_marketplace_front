import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { CountriesType, CountryType } from '../model/CountryModel';
import { AppRootState } from '.';

export const getCountries = createAppAsyncThunk('contactsApp/countries/getCountries', async () => {
	const response = await axios.get('/api/countries');

	const data = (await response.data) as CountriesType;

	return data;
});

const countriesAdapter = createEntityAdapter<CountryType>({});

export const { selectAll: selectCountries, selectById: selectCountriesById } = countriesAdapter.getSelectors(
	(state: AppRootState) => state.contactsApp?.countries
);

const countriesSlice = createSlice({
	name: 'contactsApp/countries',
	initialState: countriesAdapter.getInitialState([]),
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(getCountries.fulfilled, (state, action) => countriesAdapter.setAll(state, action.payload));
	}
});

export type countriesSliceType = typeof countriesSlice;

export default countriesSlice;
