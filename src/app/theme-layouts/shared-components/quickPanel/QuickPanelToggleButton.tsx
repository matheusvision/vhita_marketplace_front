import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/index';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleQuickPanel } from './store/stateSlice';

type Props = {
	children?: React.ReactNode;
};

function QuickPanelToggleButton(props: Props) {
	const { children = <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="w-40 h-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
