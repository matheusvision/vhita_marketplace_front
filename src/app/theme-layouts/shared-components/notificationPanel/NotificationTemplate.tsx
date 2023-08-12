import { ForwardedRef, forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import { NotificationModelProps } from 'app/theme-layouts/shared-components/notificationPanel/model/NotificationModel';
import NotificationCard from './NotificationCard';

type NotificationTemplateProps = {
	item: NotificationModelProps;
	onClose: () => void;
};

const NotificationTemplate = forwardRef((props: NotificationTemplateProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { item } = props;

	return (
		<SnackbarContent
			ref={ref}
			className="mx-auto max-w-320 w-full relative pointer-events-auto py-4"
		>
			<NotificationCard
				item={item}
				onClose={props.onClose}
			/>
		</SnackbarContent>
	);
});

export default NotificationTemplate;
