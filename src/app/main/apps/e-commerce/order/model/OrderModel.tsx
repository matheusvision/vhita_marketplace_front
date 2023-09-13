import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ProductType } from '../../product/model/ProductModel';

export type OrderType = {
	id: string;
	reference: string;
	subtotal: string;
	tax: string;
	discount: string;
	total: string;
	date: string;
	customer: Customer;
	products: PartialDeep<ProductType>[];
	status: OrderStatus[];
	payment: Payment;
	shippingDetails: ShippingDetail[];
};

type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	company: string;
	jobTitle: string;
	email: string;
	phone: string;
	invoiceAddress: Address;
	shippingAddress: Address;
};

type Address = {
	address: string;
	lat: number;
	lng: number;
};

export type OrderStatus = {
	id: string;
	name: string;
	color: string;
	date?: string;
};

type Payment = {
	transactionId: string;
	amount: string;
	method: string;
	date: string;
};

type ShippingDetail = {
	tracking: string;
	carrier: string;
	weight: string;
	fee: string;
	date: string;
};

export type OrdersType = OrderType[];

const OrderModel = (data: PartialDeep<OrderType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('order-'),
		reference: '',
		subtotal: '',
		tax: '',
		discount: '',
		total: '',
		date: '',
		customer: {
			id: null,
			firstName: '',
			lastName: '',
			avatar: '',
			company: '',
			jobTitle: '',
			email: '',
			phone: '',
			invoiceAddress: {
				address: '',
				lat: null,
				lng: null
			},
			shippingAddress: {
				address: '',
				lat: null,
				lng: null
			}
		},
		products: [],
		status: [],
		payment: { transactionId: '', amount: '', method: '', date: '' },
		shippingDetails: []
	});

export default OrderModel;
