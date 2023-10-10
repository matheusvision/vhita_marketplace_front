import { FC } from 'react';
import { FuseNavItemType } from './types/FuseNavItemType';

const components: { [key: string]: FC<FuseNavItemComponentProps> } = {};

/**
 * Register a component to FuseNavItem.
 */
export function registerComponent(name: string, Component: React.FC) {
	components[name] = Component;
}

export type FuseNavItemComponentProps = {
	type: string;
	item: FuseNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: FuseNavItemType) => void;
};

/**
Component to render NavItem depending on its type.
*/
export default function FuseNavItem(props: FuseNavItemComponentProps) {
	const { type } = props;
	const C = components[type];
	return C ? <C {...props} /> : null;
}
