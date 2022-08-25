import { createSelector, createSlice } from '@reduxjs/toolkit';
import i18n from 'src/i18n';
import { setDefaultSettings } from './fuse/settingsSlice';

export const changeLanguage = (languageId: any) => (dispatch: any, getState: any) => {
	const { direction } = getState().fuse.settings.defaults;

	const newLangDirection = i18n.dir(languageId);

	/*
    If necessary, change theme direction
     */
	if (newLangDirection !== direction) {
		dispatch(setDefaultSettings({ direction: newLangDirection }));
	}

	/*
    Change Language
     */
	return i18n.changeLanguage(languageId).then(() => {
		dispatch(i18nSlice.actions.languageChanged(languageId));
	});
};

const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		language: i18n.options.lng,
		languages: [
			{ id: 'en', title: 'English', flag: 'US' },
			{ id: 'tr', title: 'Turkish', flag: 'TR' },
			{ id: 'ar', title: 'Arabic', flag: 'SA' }
		]
	},
	reducers: {
		languageChanged: (state, action) => {
			state.language = action.payload;
		}
	}
});

export const selectCurrentLanguageId = ({ i18n: _i18n }) => _i18n.language;

export const selectLanguages = ({ i18n: _i18n }) => _i18n.languages;

export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => i18n.dir(id));

export const selectCurrentLanguage = createSelector([selectCurrentLanguageId, selectLanguages], (id, languages) =>
	languages.find((lng: any) => lng.id === id)
);

export default i18nSlice.reducer;
