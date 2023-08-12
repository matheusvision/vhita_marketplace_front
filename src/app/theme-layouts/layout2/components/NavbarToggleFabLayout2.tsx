import { navbarToggle, navbarToggleMobile } from 'app/store/fuse/navbarSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/index';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import NavbarToggleFab from 'app/theme-layouts/shared-components/NavbarToggleFab';
import { Layout2ConfigDefaultsType } from '../Layout2Config';

type NavbarToggleFabLayout2Props = {
	className?: string;
};

function NavbarToggleFabLayout2(props: NavbarToggleFabLayout2Props) {
	const { className } = props;

	const isMobile = useThemeMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('lg'));

	const config = useSelector(selectFuseCurrentLayoutConfig) as Layout2ConfigDefaultsType;

	const dispatch = useAppDispatch();

	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
		/>
	);
}

export default NavbarToggleFabLayout2;
