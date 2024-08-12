import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/system/colorManipulator';
import { toggleNotificationPanel } from './notificationPanelSlice';
import { useGetAllNotificationsQuery } from './NotificationApi';

type NotificationPanelToggleButtonProps = {
	children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */

function NotificationPanelToggleButton(props: NotificationPanelToggleButtonProps) {
	const {
		children = (
			<FuseSvgIcon
				size={20}
				sx={{
					color: (theme) =>
						theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary
				}}
			>
				heroicons-outline:bell
			</FuseSvgIcon>
		)
	} = props;
	const { data: notifications } = useGetAllNotificationsQuery();
	const [animate, setAnimate] = useState(false);
	const prevNotificationCount = useRef(notifications?.length);
	const theme = useTheme();

	const dispatch = useAppDispatch();
	const controls = useAnimation();

	useEffect(() => {
		if (animate) {
			controls.start({
				rotate: [0, 20, -20, 0],
				color: [theme.palette.secondary.main],
				transition: { duration: 0.2, repeat: 5 }
			});
		} else {
			controls.start({
				rotate: 0,
				scale: 1,
				color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary
			});
		}
	}, [animate, controls]);

	useEffect(() => {
		if (notifications?.length > prevNotificationCount.current) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 1000); // Reset after 1 second
			return () => clearTimeout(timer);
		}

		prevNotificationCount.current = notifications?.length;
		return undefined;
	}, [notifications?.length]);

	return (
		<IconButton
			onClick={() => dispatch(toggleNotificationPanel())}
			sx={{
				borderRadius: '8px',
				width: 40,
				height: 40,
				border: (theme) => `1px solid ${theme.palette.divider}`,
				'&:hover, &:focus': {
					backgroundColor: (theme) =>
						theme.palette.mode === 'dark'
							? alpha(theme.palette.divider, 0.1)
							: alpha(theme.palette.divider, 0.6)
				}
			}}
		>
			<Badge
				color="secondary"
				variant="dot"
				invisible={notifications?.length === 0}
			>
				<motion.div animate={controls}>{children}</motion.div>
			</Badge>
		</IconButton>
	);
}

export default NotificationPanelToggleButton;
