import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import { selectUserShortcuts, updateUser } from 'src/app/auth/user/userSlice';

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
	const shortcuts = useSelector(selectUserShortcuts) || [];
	const navigation = useSelector(selectFlatNavigation);

	function handleShortcutsChange(newShortcuts: string[]) {
		dispatch(updateUser({ data: { shortcuts: newShortcuts } }));
	}

	return (
		<FuseShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={shortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

export default NavigationShortcuts;
