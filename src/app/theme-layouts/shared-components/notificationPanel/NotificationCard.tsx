import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { NotificationModelProps } from 'app/theme-layouts/shared-components/notificationPanel/model/NotificationModel';
import { MouseEvent } from 'react';

type NotificationCardProps = {
	item: NotificationModelProps;
	className?: string;
	onClose: (T: string) => void;
};

function NotificationCard(props: NotificationCardProps) {
	const { item, className, onClose } = props;

	const variant = item?.variant || '';

	const handleClose = (ev: MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		if (onClose) {
			onClose(item.id);
		}
	};

	return (
		<Card
			className={clsx(
				'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow space-x-8',
				variant === 'success' && 'bg-green-600 text-white',
				variant === 'info' && 'bg-blue-700 text-white',
				variant === 'error' && 'bg-red-600 text-white',
				variant === 'warning' && 'bg-orange-600 text-white',
				className
			)}
			elevation={0}
			component={item.useRouter ? NavLinkAdapter : 'div'}
			to={item.link || ''}
			role={item.link && 'button'}
		>
			{item.icon && !item.image && (
				<Box
					sx={{ backgroundColor: 'background.default' }}
					className="flex shrink-0 items-center justify-center w-32 h-32 mr-12 rounded-full"
				>
					<FuseSvgIcon
						className="opacity-75"
						color="inherit"
					>
						{item.icon}
					</FuseSvgIcon>
				</Box>
			)}

			{item.image && (
				<img
					className="shrink-0 w-32 h-32 mr-12 rounded-full overflow-hidden object-cover object-center"
					src={item.image}
					alt="Notification"
				/>
			)}

			<div className="flex flex-col flex-auto">
				{item.title && <Typography className="font-semibold line-clamp-1">{item.title}</Typography>}

				{item.description && (
					<div
						className="line-clamp-2"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: item.description }}
					/>
				)}

				{item.time && (
					<Typography
						className="mt-8 text-sm leading-none "
						color="text.secondary"
					>
						{formatDistanceToNow(new Date(item.time), { addSuffix: true })}
					</Typography>
				)}
			</div>

			<IconButton
				disableRipple
				className="top-0 right-0 absolute p-8"
				color="inherit"
				size="small"
				onClick={handleClose}
			>
				<FuseSvgIcon
					size={12}
					className="opacity-75"
					color="inherit"
				>
					heroicons-solid:x
				</FuseSvgIcon>
			</IconButton>
			{item.children}
		</Card>
	);
}

export default NotificationCard;
