import ThemeFormConfigTypes from '@fuse/core/FuseSettings/ThemeFormConfigTypes';
import layout1, { Layout1ConfigDefaultsType } from './layout1/Layout1Config';
import layout2, { Layout2ConfigDefaultsType } from './layout2/Layout2Config';
import layout3, { Layout3ConfigDefaultsType } from './layout3/Layout3Config';

/**
 * The type definition for the theme layout defaults.
 */
export type themeLayoutDefaultsProps =
	| Layout1ConfigDefaultsType
	| Layout3ConfigDefaultsType
	| Layout2ConfigDefaultsType;

/**
 * @typedef {Object} ThemeLayoutProps
 * @property {string} title - The name of the current theme layout.
 * @property {themeLayoutDefaultsProps} defaults - Defaults options for the current theme layout.
 * @property {ThemeFormConfigTypes} form - The form configuration of the current theme layout.
 */
export type themeLayoutProps = {
	title: string;
	defaults: themeLayoutDefaultsProps;
	form?: ThemeFormConfigTypes;
};

/**
 * @typedef {Object} themeLayoutConfigsProps
 * @property {themeLayoutProps} [key: string] - A mapping of the theme layout names and properties.
 */
export type themeLayoutConfigsProps = {
	[key: string]: themeLayoutProps;
};

/**
@type {themeLayoutConfigsProps} themeLayoutConfigs - A mapping of the theme layout names and properties.
 */
const themeLayoutConfigs: themeLayoutConfigsProps = {
	layout1: layout1 as themeLayoutProps,
	layout2: layout2 as themeLayoutProps,
	layout3: layout3 as themeLayoutProps
};

export default themeLayoutConfigs;
