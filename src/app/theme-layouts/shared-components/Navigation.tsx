import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import { FuseNavigationProps } from '@fuse/core/FuseNavigation/FuseNavigation';

/**
 * Navigation
 */
function Navigation(props: Partial<FuseNavigationProps>) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<FuseNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default memo(Navigation);
