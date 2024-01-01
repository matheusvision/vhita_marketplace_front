import QuickPanel from 'app/theme-layouts/shared-components/quickPanel/QuickPanel';
import { memo } from 'react';
import MessengerPanel from 'src/app/main/apps/messenger/messengerPanel/MessengerPanel';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<>
			<QuickPanel />

			<MessengerPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout1);
