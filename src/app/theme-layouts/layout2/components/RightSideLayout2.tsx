import { memo } from 'react';
import ChatPanel from 'app/theme-layouts/shared-components/chatPanel/ChatPanel';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

/**
 * The right side layout 2.
 */
function RightSideLayout2() {
	return (
		<>
			<ChatPanel />

			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout2);
