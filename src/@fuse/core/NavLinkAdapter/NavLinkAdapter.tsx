import { NavLink as BaseNavLink, NavLinkProps as BaseNavLinkProps, useNavigate } from 'react-router-dom';
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

export type NavLinkAdapterPropsType = BaseNavLinkProps & {
	activeClassName?: string;
	activeStyle?: CSSProperties;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component?: React.ElementType<any>;
	children?: ReactNode;
};

const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkAdapterPropsType>((props, ref) => {
	const { activeClassName = 'active', activeStyle, component: Component, ..._props } = props;
	const navigate = useNavigate();

	if (Component) {
		const { className, ...restOfProps } = _props;
		const finalClassName =
			typeof className === 'function' ? className({ isActive: false, isPending: false }) : className;
		return (
			<Component
				className={finalClassName}
				{...restOfProps}
				onClick={(e: MouseEvent) => {
					e.preventDefault();
					navigate(_props.to);
				}}
			>
				{props.children}
			</Component>
		);
	}

	return (
		<BaseNavLink
			ref={ref}
			{..._props}
			onClick={(e) => {
				e.preventDefault();
				navigate(_props.to);
			}}
			className={({ isActive }) =>
				[_props.className, isActive ? activeClassName : null].filter(Boolean).join(' ')
			}
			style={({ isActive }) => ({
				..._props.style,
				...(isActive ? activeStyle : null)
			})}
		>
			{props.children}
		</BaseNavLink>
	);
});

export default NavLinkAdapter;
