import { forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import NotificationModel from 'app/theme-layouts/shared-components/notificationPanel/model/NotificationModel';
import NotificationCard from './NotificationCard';

const NotificationTemplate = forwardRef((props: { item: typeof NotificationModel; onClose: () => void }, ref) => {
	const { item } = props;

	return (
		<SnackbarContent ref={ref} className="mx-auto max-w-320 w-full relative pointer-events-auto py-4">
			<NotificationCard item={item} onClose={props.onClose} />
		</SnackbarContent>
	);
});

export default NotificationTemplate;
