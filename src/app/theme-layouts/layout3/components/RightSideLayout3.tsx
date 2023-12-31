import { memo } from 'react';
import ChatPanel from 'app/theme-layouts/shared-components/chatPanel/ChatPanel';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

/**
 * The right side layout 3.
 */
function RightSideLayout3() {
	return (
		<>
			<ChatPanel />

			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout3);
