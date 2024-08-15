import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { alpha } from '@mui/system/colorManipulator';
import { toggleQuickPanel } from './quickPanelSlice';

type QuickPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { children = <FuseSvgIcon size={20}>heroicons-outline:bookmark</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => dispatch(toggleQuickPanel())}
			sx={{
				border: (theme) => `1px solid ${theme.palette.divider}`,
				'&:hover, &:focus': {
					backgroundColor: (theme) =>
						theme.palette.mode === 'dark'
							? alpha(theme.palette.divider, 0.1)
							: alpha(theme.palette.divider, 0.6)
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
