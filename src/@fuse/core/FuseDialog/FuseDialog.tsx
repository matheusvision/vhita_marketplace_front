import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { closeDialog, selectFuseDialogOptions, selectFuseDialogState } from 'app/store/fuse/dialogSlice';
import { useAppDispatch } from 'app/store/index';

const FuseDialog: React.FC = () => {
	const dispatch = useAppDispatch();
	const state = useSelector(selectFuseDialogState);
	const options = useSelector(selectFuseDialogOptions);

	return (
		<Dialog
			open={state}
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="fuse-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
};

export default FuseDialog;
