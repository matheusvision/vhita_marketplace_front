import { SxProps } from '@mui/system';

export { default } from './FuseNavigation';

export type FuseNavBadgeType = {
	bg?: string;
	fg?: string;
	title: string;
	classes?: string;
};

export type FuseNavigationType = FuseNavItemType[];

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

export type FuseNavigationProps = {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: FuseNavItemType) => void;
	navigation: FuseNavigationType;
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
};

export type FuseNavItemComponentProps = {
	type: string;
	item: FuseNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: FuseNavItemType) => void;
};

export type FuseNavVerticalTabProps = Omit<FuseNavigationProps, 'navigation'> & FuseNavItemComponentProps;
