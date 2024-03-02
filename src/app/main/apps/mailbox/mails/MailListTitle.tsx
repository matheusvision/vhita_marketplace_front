import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/store/hooks';
import { selectMailsTitle } from '../MailboxApi';

/**
 * The mail list title.
 */
function MailListTitle() {
	const routeParams = useParams();
	const title = useAppSelector(selectMailsTitle(routeParams));

	return <Typography className="hidden sm:flex font-semibold uppercase mx-8">{title}</Typography>;
}

export default MailListTitle;
