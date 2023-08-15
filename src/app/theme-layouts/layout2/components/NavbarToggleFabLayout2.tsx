import { navbarToggle, navbarToggleMobile } from 'app/store/fuse/navbarSlice';
import { useAppDispatch } from 'app/store/index';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import NavbarToggleFab from 'app/theme-layouts/shared-components/NavbarToggleFab';

type NavbarToggleFabLayout2Props = {
	className?: string;
};

function NavbarToggleFabLayout2(props: NavbarToggleFabLayout2Props) {
	const { className } = props;

	const isMobile = useThemeMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('lg'));

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
