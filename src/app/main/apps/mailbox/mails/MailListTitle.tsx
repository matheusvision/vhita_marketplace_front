import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'react-redux';
import { selectMailsTitle } from '../store/mailsSlice';

function MailListTitle() {
	const routeParams = useParams();
	const title = useAppSelector(selectMailsTitle(routeParams));

	return <Typography className="font-semibold uppercase mx-8">{title}</Typography>;
}

export default MailListTitle;
