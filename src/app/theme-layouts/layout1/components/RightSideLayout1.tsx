import { memo, lazy } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));
const MessengerPanel = lazy(() => import('src/app/main/apps/messenger/messengerPanel/MessengerPanel'));
const NotificationPanel = lazy(() => import('src/app/main/apps/notifications/NotificationPanel'));

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
