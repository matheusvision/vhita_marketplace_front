import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useGetMailboxFoldersQuery, useGetMailboxLabelsQuery, useGetMailboxMailsQuery } from '../MailboxApi';

function useGetMails() {
	const routeParams = useParams();
	const { category, subCategory } = routeParams;

	const { data: folders } = useGetMailboxFoldersQuery();
	const { data: labels } = useGetMailboxLabelsQuery();

	if (category === 'folders') {
		const folderId = _.find(folders, { slug: subCategory })?.id;
		return useGetMailboxMailsQuery({ folder: folderId });
	}

	if (category === 'filters') {
		return useGetMailboxMailsQuery({ [subCategory]: true });
	}

	if (category === 'labels') {
		const labelId = _.find(labels, { slug: subCategory })?.id;
		return useGetMailboxMailsQuery({ labels: labelId });
	}

	return useGetMailboxMailsQuery({});
}

export default useGetMails;
