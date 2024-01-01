import { memo } from 'react';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';
import MessengerPanel from 'src/app/main/apps/messenger/messengerPanel/MessengerPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

/**
 * The right side layout 3.
 */
function RightSideLayout3() {
	return (
		<>
			<MessengerPanel />

			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout3);
