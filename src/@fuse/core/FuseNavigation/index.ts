import { SxProps } from '@mui/system';

export { default } from './FuseNavigation';

export interface FuseNavBadgeProps {
	bg: string;
	fg: string;
	title: string;
}

export interface FuseNavItemProps {
	id: string;
	title?: string;
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
	children?: FuseNavItemProps[];
}

export interface FuseNavigationProps {
	navigation: FuseNavItemProps[];
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
}
export interface FuseNavLayoutProps extends FuseNavigationProps {
	firstLevel?: boolean;
	active?: boolean;
	dense?: boolean;
	className?: string;
	selectedId?: string;
	onItemClick?: (FuseNavItemProps) => void;
}

export interface FuseNavComponentProps {
	type: string;
	item: FuseNavItemProps;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (FuseNavItemProps) => void;
}

export interface FuseNavVerticalTabProps extends Omit<FuseNavLayoutProps, 'navigation'>, FuseNavComponentProps {}
