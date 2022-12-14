import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/index';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import { selectUserShortcuts, updateUserShortcuts } from 'app/store/user/userSlice';

function NavigationShortcuts(props: any) {
	const { variant, className } = props;
	const dispatch = useAppDispatch();
	const shortcuts = useSelector(selectUserShortcuts) || [];
	const navigation = useSelector(selectFlatNavigation);

	function handleShortcutsChange(newShortcuts: any) {
		dispatch(updateUserShortcuts(newShortcuts));
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
