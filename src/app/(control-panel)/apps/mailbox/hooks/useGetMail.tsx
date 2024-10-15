import { useParams } from 'react-router-dom';
import { useGetMailboxMailQuery } from '../MailboxApi';

function useGetMail() {
	const routeParams = useParams();
	const { mailId } = routeParams;

	return useGetMailboxMailQuery(mailId, {
		skip: !mailId
	});
}

export default useGetMail;
