import { memo } from 'react';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import MessengerPanel from 'src/app/main/apps/messenger/messengerPanel/MessengerPanel';

/**
 * The right side layout 3.
 */
function RightSideLayout3() {
	return (
		<>
			<MessengerPanel/>

			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout3);
