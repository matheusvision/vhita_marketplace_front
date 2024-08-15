import { useGetContactsItemQuery } from './ContactsApi';

type ContactTitleProps = {
	contactId?: string;
};

function ContactTitle(props: ContactTitleProps) {
	const { contactId } = props;
	const {
		data: contact,
		isLoading,
		isError
	} = useGetContactsItemQuery(contactId, {
		skip: !contactId
	});

	return contact?.name || 'Contact';
}

export default ContactTitle;
