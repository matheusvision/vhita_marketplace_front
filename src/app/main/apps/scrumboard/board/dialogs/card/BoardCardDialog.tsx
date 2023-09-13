import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'react-redux';
import { closeCardDialog, selectCardDialogOpen } from '../../../store/cardSlice';
import BoardCardForm from './BoardCardForm';

function BoardCardDialog(props) {
	const dispatch = useAppDispatch();
	const cardDialogOpen = useAppSelector(selectCardDialogOpen);

	return (
		<Dialog
			classes={{
				paper: 'max-w-lg w-full m-8 sm:m-24'
			}}
			onClose={(ev) => dispatch(closeCardDialog())}
			open={cardDialogOpen}
		>
			<BoardCardForm />
		</Dialog>
	);
}

export default BoardCardDialog;
