import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ChatAppContext } from '../../ChatApp';

type MainSidebarMoreMenuProps = {
	className?: string;
};

/**
 * The main sidebar more menu.
 *
 * @param {MainSidebarMoreMenuProps} props The props.
 * @returns {JSX.Element} The component.
 */
function MainSidebarMoreMenu(props: MainSidebarMoreMenuProps) {
	const { className } = props;

	const { setUserSidebarOpen } = useContext(ChatAppContext);

	const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);

	function handleMoreMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose() {
		setMoreMenuEl(null);
	}

	return (
		<div className={className}>
			<IconButton
				aria-owns={moreMenuEl ? 'main-more-menu' : null}
				aria-haspopup="true"
				onClick={handleMoreMenuClick}
				size="large"
			>
				<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
			</IconButton>
			<Menu
				id="chats-more-menu"
				anchorEl={moreMenuEl}
				open={Boolean(moreMenuEl)}
				onClose={handleMoreMenuClose}
			>
				<MenuItem
					onClick={() => {
						setUserSidebarOpen(true);
						handleMoreMenuClose();
					}}
				>
					Profile
				</MenuItem>
				<MenuItem onClick={handleMoreMenuClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

export default MainSidebarMoreMenu;
