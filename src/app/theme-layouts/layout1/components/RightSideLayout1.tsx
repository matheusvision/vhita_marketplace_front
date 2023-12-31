import { memo } from 'react';
import NotificationPanel from 'src/app/main/apps/notifications/NotificationPanel';

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<>
			{/* <ChatPanel />

			<QuickPanel />

			<NotificationPanel /> */}
			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout1);
