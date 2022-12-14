import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/index';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleQuickPanel } from './store/stateSlice';

function QuickPanelToggleButton(props: any) {
	const dispatch = useAppDispatch();

	return (
		<IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleQuickPanel())} size="large">
			{props.children}
		</IconButton>
	);
}

QuickPanelToggleButton.defaultProps = {
	children: <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon>
};

export default QuickPanelToggleButton;
