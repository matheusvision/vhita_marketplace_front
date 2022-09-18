import { CSSProperties, forwardRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps as BaseNavLinkProps } from 'react-router-dom';

interface NavLinkProps extends BaseNavLinkProps {
	activeClassName?: string;
	activeStyle?: CSSProperties;
}

const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkProps>(
	({ activeClassName = 'active', activeStyle, ...props }: NavLinkProps, ref) => (
		<BaseNavLink
			ref={ref}
			{...props}
			className={({ isActive }) => [props.className, isActive ? activeClassName : null].filter(Boolean).join(' ')}
			style={({ isActive }) => ({
				...props.style,
				...(isActive ? activeStyle : null)
			})}
		/>
	)
);

export default NavLinkAdapter;
