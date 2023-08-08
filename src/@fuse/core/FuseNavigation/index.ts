import { SxProps } from '@mui/system';

export { default } from './FuseNavigation';

export interface FuseNavBadgeProps {
	bg: string;
	fg: string;
	title: string;
}
export type FuseNavigationType = FuseNavItemProps[];

export type FuseNavItemProps = {
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
	badge?: FuseNavBadgeProps;
	children?: FuseNavigationType;
};

export interface FuseNavigationProps {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: FuseNavItemProps) => void;
	navigation: FuseNavigationType;
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
}

export interface FuseNavComponentProps {
	type: string;
	item: FuseNavItemProps;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: FuseNavItemProps) => void;
}

export interface FuseNavVerticalTabProps extends Omit<FuseNavigationProps, 'navigation'>, FuseNavComponentProps {}
