import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { selectFuseCurrentSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarToggle, navbarToggleMobile } from 'app/store/fuse/navbarSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<FuseSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</FuseSvgIcon>
		)
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('lg'));
	const settings: FuseSettingsConfigType = useSelector(selectFuseCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config.navbar.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
