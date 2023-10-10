import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'src/i18n';
import { AppThunkType, RootStateType } from 'app/store/types';
import { setDefaultSettings } from './fuse/settingsSlice';

/**
 * Changes the language of the application and updates the settings if necessary.
 */
export const changeLanguage =
	(languageId: string): AppThunkType =>
	async (dispatch, getState) => {
		const { direction } = getState().fuse.settings.defaults;

		const newLangDirection = i18n.dir(languageId);

		/*
		If necessary, change theme direction
		 */
		if (newLangDirection !== direction) {
			await dispatch(setDefaultSettings({ direction: newLangDirection }));
		}

		/*
		Change Language
		 */
		return i18n.changeLanguage(languageId).then(() => {
			dispatch(i18nSlice.actions.languageChanged(languageId));
		});
	};

/**
 * The type definition for a language object.
 */
export type LanguageType = {
	id: string;
	title: string;
	flag: string;
};

/**
 * The type definition for the i18n state.
 */
type I18nState = {
	language: string;
	languages: LanguageType[];
};

/**
 * The i18n slice
 */
const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		language: i18n.options.lng,
		languages: [
			{ id: 'en', title: 'English', flag: 'US' },
			{ id: 'tr', title: 'Turkish', flag: 'TR' },
			{ id: 'ar', title: 'Arabic', flag: 'SA' }
		]
	} as I18nState,
	reducers: {
		/**
		 * Updates the state with the new language.
		 */
		languageChanged: (state, action: PayloadAction<string>) => {
			state.language = action.payload;
		}
	}
});

export const selectCurrentLanguageId = ({ i18n: _i18n }: RootStateType) => _i18n.language;

export const selectLanguages = ({ i18n: _i18n }: RootStateType) => _i18n.languages;

export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => i18n.dir(id));

export const selectCurrentLanguage = createSelector([selectCurrentLanguageId, selectLanguages], (id, languages) =>
	languages.find((lng) => lng.id === id)
);

export default i18nSlice.reducer;
