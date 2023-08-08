import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Box } from '@mui/system';
import { FuseNavVerticalTabProps } from '@fuse/core/FuseNavigation';
import { ListItemButton } from '@mui/material';
import FuseNavBadge from '../../FuseNavBadge';
import FuseSvgIcon from '../../../FuseSvgIcon';

const Root = styled(Box)(({ theme }) => ({
	'& > .fuse-list-item': {
		minHeight: 100,
		height: 100,
		width: 100,
		borderRadius: 12,
		margin: '0 0 4px 0',
		color: alpha(theme.palette.text.primary, 0.7),
		cursor: 'pointer',
		textDecoration: 'none!important',
		padding: 0,
		'&.dense': {
			minHeight: 52,
			height: 52,
			width: 52
		},
		'&.type-divider': {
			padding: 0,
			height: 2,
			minHeight: 2,
			margin: '12px 0',
			backgroundColor:
				theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none'
		},
		'&:hover': {
			color: theme.palette.text.primary
		},
		'&.active': {
			color: theme.palette.text.primary,
			backgroundColor:
				theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			// pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .fuse-list-item-text-primary': {
				color: 'inherit'
			},
			'& .fuse-list-item-icon': {
				color: 'inherit'
			}
		},
		'& .fuse-list-item-icon': {
			color: 'inherit'
		},
		'& .fuse-list-item-text': {}
	}
}));

function FuseNavVerticalTab(props: FuseNavVerticalTabProps) {
	const { item, onItemClick, firstLevel, dense, selectedId } = props;

	const component = item.url ? NavLinkAdapter : '';

	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	return useMemo(
		() => (
			<Root sx={item.sx}>
				<ListItemButton
					component={component}
					className={clsx(
						`type-${item.type}`,
						dense && 'dense',
						selectedId === item.id && 'active',
						'fuse-list-item flex flex-col items-center justify-center p-12'
					)}
					onClick={() => onItemClick && onItemClick(item)}
					{...itemProps}
				>
					{dense ? (
						<Tooltip
							title={item.title || ''}
							placement="right"
						>
							<div className="w-32 h-32 min-h-32 flex items-center justify-center relative">
								{item.icon ? (
									<FuseSvgIcon
										className={clsx('fuse-list-item-icon', item.iconClass)}
										color="action"
									>
										{item.icon}
									</FuseSvgIcon>
								) : (
									item.title && <div className="font-bold text-16">{item.title[0]}</div>
								)}
								{item.badge && (
									<FuseNavBadge
										badge={item.badge}
										className="absolute top-0 ltr:right-0 rtl:left-0 min-w-16 h-16 p-4 justify-center"
									/>
								)}
							</div>
						</Tooltip>
					) : (
						<>
							<div className="w-32 h-32 min-h-32 flex items-center justify-center relative mb-8">
								{item.icon ? (
									<FuseSvgIcon
										size={32}
										className={clsx('fuse-list-item-icon', item.iconClass)}
										color="action"
									>
										{item.icon}
									</FuseSvgIcon>
								) : (
									item.title && <div className="font-bold text-20">{item.title[0]}</div>
								)}
								{item.badge && (
									<FuseNavBadge
										badge={item.badge}
										className="absolute top-0 ltr:right-0 rtl:left-0 min-w-16 h-16 p-4 justify-center"
									/>
								)}
							</div>

							<ListItemText
								className="fuse-list-item-text grow-0 w-full"
								primary={item.title}
								classes={{
									primary:
										'text-12 font-medium fuse-list-item-text-primary truncate text-center truncate'
								}}
							/>
						</>
					)}
				</ListItemButton>
				{!firstLevel &&
					item.children &&
					item.children.map((_item) => (
						<NavVerticalTab
							key={_item.id}
							type={`vertical-${_item.type}`}
							item={_item}
							nestedLevel={0}
							onItemClick={onItemClick}
							dense={dense}
							selectedId={selectedId}
						/>
					))}
			</Root>
		),
		[firstLevel, item, onItemClick, dense, selectedId]
	);
}

const NavVerticalTab = FuseNavVerticalTab;

export default NavVerticalTab;
