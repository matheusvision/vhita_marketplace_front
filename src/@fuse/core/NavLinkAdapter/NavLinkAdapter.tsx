import { CSSProperties, forwardRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps as BaseNavLinkProps } from 'react-router-dom';

export type NavLinkAdapterPropsType = BaseNavLinkProps & {
	activeClassName?: string;
	activeStyle?: CSSProperties;
};

const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkAdapterPropsType>((props, ref) => {
	const { activeClassName = 'active', activeStyle, ..._props } = props;

	return (
		<BaseNavLink
			ref={ref}
			{..._props}
			className={({ isActive }) =>
				[_props.className, isActive ? activeClassName : null].filter(Boolean).join(' ')
			}
			style={({ isActive }) => ({
				..._props.style,
				...(isActive ? activeStyle : null)
			})}
		/>
	);
});

export default NavLinkAdapter;
