import { memo } from 'react';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import MessengerPanel from '../../../main/apps/messenger/messengerPanel/MessengerPanel';

/**
 * The right side layout 2.
 */
function RightSideLayout2() {
	return (
		<>
			<MessengerPanel />

			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout2);
