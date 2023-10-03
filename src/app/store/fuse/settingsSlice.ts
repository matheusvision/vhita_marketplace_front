import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions
} from '@fuse/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { setUser, updateUserSettings } from 'app/store/user/userSlice';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import { AppThunkType, RootStateType } from 'app/store/types';
import { Theme } from '@mui/material/styles/createTheme';
import { FuseSettingsConfigType, FuseThemeType } from '@fuse/core/FuseSettings/FuseSettings';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';

export const changeFuseTheme =
	(theme: FuseThemeType): AppThunkType<void> =>
	(dispatch, getState) => {
		const { fuse } = getState();
		const { settings } = fuse;

		const newSettings = {
			...settings.current,
			theme: {
				main: theme,
				navbar: theme,
				toolbar: theme,
				footer: theme
			}
		};

		return dispatch(setDefaultSettings(newSettings));
	};

type layoutProps = {
	style: string;
	config: unknown;
};

function getInitialSettings(): FuseSettingsConfigType {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';

	const layout: layoutProps = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults
	};

	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

export function generateSettings(_defaultSettings: FuseSettingsConfigType, _newSettings: FuseSettingsConfigType) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings
	);
}

const initialSettings = getInitialSettings();

type initialStateProps = {
	initial: FuseSettingsConfigType;
	defaults: FuseSettingsConfigType;
	current: FuseSettingsConfigType;
};

const initialState: initialStateProps = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings)
};

export const setDefaultSettings = createAppAsyncThunk(
	'fuse/settings/setDefaultSettings',
	async (val: FuseSettingsConfigType, { dispatch, getState }) => {
		const { fuse } = getState();
		const { settings } = fuse;

		const defaults = generateSettings(settings.defaults, val);

		await dispatch(updateUserSettings(defaults));

		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults)
		};
	}
);

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<FuseSettingsConfigType>) => {
			const current = generateSettings(state.defaults, action.payload);

			return {
				...state,
				current
			};
		},

		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults)
		})
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults)
				};
			});
	}
});

type directionType = 'ltr' | 'rtl';

const getDirection = (state: RootStateType): directionType => state.fuse.settings.current.direction;
const getMainTheme = (state: RootStateType): Partial<Theme> => state.fuse.settings.current.theme.main;
const getNavbarTheme = (state: RootStateType): Partial<Theme> => state.fuse.settings.current.theme.navbar;
const getToolbarTheme = (state: RootStateType): Partial<Theme> => state.fuse.settings.current.theme.toolbar;
const getFooterTheme = (state: RootStateType): Partial<Theme> => state.fuse.settings.current.theme.footer;

function generateMuiTheme(theme: Partial<Theme>, direction: directionType) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions);

	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction
		})
	);
}

export const selectContrastMainTheme = (bgColor: string) => {
	function isDark(color: string) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}
	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

function changeThemeMode(theme: Partial<Theme>, mode: 'dark' | 'light') {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};

	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFuseCurrentSettings = (state: RootStateType) => state.fuse.settings.current;

export const selectFuseCurrentLayoutConfig = (state: RootStateType) => state.fuse.settings.current.layout.config;

export const selectFuseDefaultSettings = (state: RootStateType) => state.fuse.settings.defaults;

// export const selectFuseThemesSettings = (state: RootState) => state.fuse.settings.themes;

export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
