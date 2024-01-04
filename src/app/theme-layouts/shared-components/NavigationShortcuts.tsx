import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'app/store';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import { selectIsUserGuest, selectUserShortcuts, updateUser } from 'src/app/auth/user/userSlice';
import { usePrevious } from '@fuse/hooks';
import { useEffect } from 'react';
import { useAuth } from '../../auth/AuthRouteProvider';
import _ from '../../../@lodash/@lodash';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const dispatch = useAppDispatch();
	const navigation = useSelector(selectFlatNavigation);

	const userShortcuts = useSelector(selectUserShortcuts) || [];
	const isUserGuest = useAppSelector(selectIsUserGuest);
	const prevUserShortcuts = usePrevious(userShortcuts);

	const { updateUser: updateUserService } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUserService({ data: { shortcuts: userShortcuts } });
		}
	}, [isUserGuest, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		dispatch(updateUser({ data: { shortcuts: newShortcuts } }));
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

export default NavigationShortcuts;
