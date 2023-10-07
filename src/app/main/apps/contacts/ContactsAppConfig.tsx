import lazyWithSlices from 'app/store/lazyWithSlices';
import ContactView from './contact/ContactView';
import ContactForm from './contact/ContactForm';
import slices from './store';

const ContactsApp = lazyWithSlices(() => import('./ContactsApp'), slices);

/**
 * The ContactsApp configuration.
 */
const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/contacts',
			element: <ContactsApp />,
			children: [
				{
					path: ':id',
					element: <ContactView />
				},
				{
					path: ':id/edit',
					element: <ContactForm />
				}
			]
		}
	]
};

export default ContactsAppConfig;
