import _ from '@lodash';
import { PartialDeep } from 'type-fest';

export type OrderType = {
	id: string;
	title: string;
};

export type OrdersType = OrderType[];

const OrderModel = (data: PartialDeep<OrderType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: ''
	});

export default OrderModel;
