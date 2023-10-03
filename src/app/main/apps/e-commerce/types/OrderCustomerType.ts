import { OrderAddressType } from './OrderAddressType';

export type OrderCustomerType = {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	company: string;
	jobTitle: string;
	email: string;
	phone: string;
	invoiceAddress: OrderAddressType;
	shippingAddress: OrderAddressType;
};
