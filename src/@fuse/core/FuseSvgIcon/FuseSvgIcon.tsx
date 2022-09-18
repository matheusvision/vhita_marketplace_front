import clsx from 'clsx';
import { forwardRef, ReactNode, SVGProps } from 'react';
import { styled, Theme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/system';
import Icon from '@mui/material/Icon';

export type Ref = HTMLElement;

interface Props extends SVGProps<HTMLElement> {
	children: string;
	className?: string;
	size?: number | string;
	sx?: SxProps<Theme>;
	color?: 'inherit' | 'disabled' | 'primary' | 'secondary' | 'action' | 'error' | 'info' | 'success' | 'warning';
}

const Root = styled(Box)<Props>(({ theme, ...props }) => ({
	width: props.size,
	height: props.size,
	minWidth: props.size,
	minHeight: props.size,
	fontSize: props.size,
	lineHeight: props.size,
	color: {
		primary: theme.palette.primary.main,
		secondary: theme.palette.secondary.main,
		info: theme.palette.info.main,
		success: theme.palette.success.main,
		warning: theme.palette.warning.main,
		action: theme.palette.action.active,
		error: theme.palette.error.main,
		disabled: theme.palette.action.disabled,
		inherit: undefined
	}[props.color]
}));

const FuseSvgIcon = forwardRef<Ref, Props>((props, ref) => {
	const { children, className, color } = props;

	if (!children.includes(':')) {
		return <Icon ref={ref} {...props} />;
	}

	const iconPath = children.replace(':', '.svg#');

	return (
		<Root
			{...props}
			component="svg"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			className={clsx('shrink-0 fill-current ', className)}
			ref={ref}
			size={props.size}
			sx={props.sx}
			color={color}
		>
			<use xlinkHref={`assets/icons/${iconPath}`} />
		</Root>
	);
});

FuseSvgIcon.defaultProps = {
	size: 24,
	sx: {},
	color: 'inherit'
};

export default FuseSvgIcon;
