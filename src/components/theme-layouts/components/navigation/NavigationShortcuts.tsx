import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { usePrevious } from '@fuse/hooks';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import withSlices from 'src/store/withSlices';
import { User } from '@auth/user';
import useUser from '@auth/useUser';
import setIn from '@/utils/setIn';
import { navigationSlice } from './store/navigationSlice';
import useNavigation from './hooks/useNavigation';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const { flattenNavigation: navigation } = useNavigation();
	const { data: user, updateUser, isGuest } = useUser();
	const [userShortcuts, setUserShortcuts] = useState<string[]>(user?.shortcuts || []);
	const prevUserShortcuts = usePrevious(userShortcuts);

	useEffect(() => {
		if (!isGuest && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUser(setIn(user, 'shortcuts', userShortcuts) as User);
		}
	}, [isGuest, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		setUserShortcuts(newShortcuts);
	}

	return (
		<FuseShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

const NavigationShortcutsWithSlices = withSlices<NavigationShortcutsProps>([navigationSlice])(NavigationShortcuts);

export default NavigationShortcutsWithSlices;
