import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/index';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';

function Navigation(props: any) {
	const navigation = useSelector(selectNavigation);
	const isMobile = useThemeMediaQuery((theme: any) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick(item: any) {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<FuseNavigation
				className={clsx('navigation', props.className)}
				navigation={navigation}
				layout={props.layout}
				dense={props.dense}
				active={props.active}
				onItemClick={handleItemClick}
			/>
		);
	}, [dispatch, isMobile, navigation, props.active, props.className, props.dense, props.layout]);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default memo(Navigation);
