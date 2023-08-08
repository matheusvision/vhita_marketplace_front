import ThemeFormConfigTypes from '@fuse/core/FuseSettings/ThemeFormConfigTypes';
import layout1, { Layout1ConfigDefaultsType } from './layout1/Layout1Config';
import layout2, { Layout2ConfigDefaultsType } from './layout2/Layout2Config';
import layout3, { Layout3ConfigDefaultsType } from './layout3/Layout3Config';

export type themeLayoutDefaultsProps =
	| Layout1ConfigDefaultsType
	| Layout3ConfigDefaultsType
	| Layout2ConfigDefaultsType;

export type themeLayoutProps = {
	title: string;
	defaults: themeLayoutDefaultsProps;
	form?: ThemeFormConfigTypes;
};

export type themeLayoutConfigsProps = {
	[key: string]: themeLayoutProps;
};

const themeLayoutConfigs: themeLayoutConfigsProps = {
	layout1: layout1 as themeLayoutProps,
	layout2: layout2 as themeLayoutProps,
	layout3: layout3 as themeLayoutProps
};

export default themeLayoutConfigs;
