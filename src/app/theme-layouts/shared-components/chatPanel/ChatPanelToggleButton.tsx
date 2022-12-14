import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/index';

import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleChatPanel } from './store/stateSlice';

const ChatPanelToggleButton = (props: any) => {
	const dispatch = useAppDispatch();

	return (
		<IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleChatPanel())} size="large">
			{props.children}
		</IconButton>
	);
};

ChatPanelToggleButton.defaultProps = {
	children: <FuseSvgIcon>heroicons-outline:chat</FuseSvgIcon>
};

export default ChatPanelToggleButton;
