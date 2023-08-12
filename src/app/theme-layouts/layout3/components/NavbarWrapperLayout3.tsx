import Hidden from '@mui/material/Hidden';
import { styled, ThemeProvider } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { navbarCloseMobile, selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/index';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from 'app/store/fuse/settingsSlice';
import { Layout3ConfigDefaultsType } from 'app/theme-layouts/layout3/Layout3Config';
import NavbarLayout3 from './NavbarLayout3';
import NavbarMobileLayout3 from './NavbarMobileLayout3';
import NavbarToggleFab from '../../shared-components/NavbarToggleFab';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& > .MuiDrawer-paper': {
		height: '100%',
		flexDirection: 'column',
		flex: '1 1 auto',
		width: 280,
		minWidth: 280,
		transition: theme.transitions.create(['width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		})
	}
}));

type NavbarWrapperLayout3Props = {
	className?: string;
};

function NavbarWrapperLayout3(props: NavbarWrapperLayout3Props) {
	const { className = '' } = props;

	const dispatch = useAppDispatch();
	const config: Layout3ConfigDefaultsType = useSelector(selectFuseCurrentLayoutConfig);
	const navbarTheme = useSelector(selectNavbarTheme);
	const navbar = useSelector(selectFuseNavbar);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<Hidden lgDown>
					<NavbarLayout3 className={clsx(className)} />
				</Hidden>

				<Hidden lgUp>
					<StyledSwipeableDrawer
						anchor="left"
						variant="temporary"
						open={navbar.mobileOpen}
						onClose={() => dispatch(navbarCloseMobile())}
						onOpen={() => {}}
						disableSwipeToOpen
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						<NavbarMobileLayout3 />
					</StyledSwipeableDrawer>
				</Hidden>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && (
				<Hidden lgUp>
					<NavbarToggleFab />
				</Hidden>
			)}
		</>
	);
}

export default memo(NavbarWrapperLayout3);
