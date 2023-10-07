import { SxProps } from '@mui/system';
import { FuseNavBadgeType } from './FuseNavBadgeType';
import { FuseNavigationType } from './FuseNavigationType';

/**
 * FuseNavItemType
 *
 * A type for Fuse navigation item and its properties.
 *
 * @typedef {Object} FuseNavItemType
 * @property {string} id - unique id for the item
 * @property {string?} title - optional title string for the item
 * @property {string?} translate - optional translation string for the title value
 * @property {string[] | string?} auth - optional authorization string or array of strings
 * @property {string?} subtitle - optional subtitle string for the item
 * @property {string?} icon - optional icon name for the item
 * @property {string?} iconClass - optional icon classes for the item
 * @property {string?} url - optional url string for the item
 * @property {string?} target - optional target string to specify the target for navigation
 * @property {string?} type - optional type identifier string
 * @property {SxProps?} sx - optional sx style object for the item
 * @property {boolean?} disabled - optional boolean flag to indicate the item is disabled
 * @property {boolean?} active - optional boolean flag to indicate the item is active
 * @property {boolean?} exact - optional boolean flag to indicate the item should match the path exactly
 * @property {boolean?} end - optional boolean flag to indicate the item is the last item in the list
 * @property {FuseNavBadgeType?} badge - optional badge object for the item
 * @property {FuseNavigationType?} children - optional array of FuseNavigationType items for the item
 */
export type FuseNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: FuseNavBadgeType;
	children?: FuseNavigationType;
};
