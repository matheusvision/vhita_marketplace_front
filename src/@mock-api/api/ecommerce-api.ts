import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { ProductType, ProductsType } from 'src/app/main/apps/e-commerce/product/model/ProductModel';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { OrderType, OrdersType } from '../../app/main/apps/e-commerce/order/model/OrderModel';

let productsDB = mockApi.components.examples.ecommerce_products.value as ProductsType;
let ordersDB = mockApi.components.examples.ecommerce_orders.value as OrdersType;

mock.onGet('/api/ecommerce/products').reply(() => {
	return [200, productsDB];
});

mock.onPost('/api/ecommerce/products').reply(({ data }: { data: string }) => {
	const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data) } as ProductType;

	productsDB.push(newProduct);

	return [200, newProduct];
});

mock.onDelete('/api/ecommerce/products').reply(({ data }: { data: string }) => {
	const ids = JSON.parse(data) as string[];
	productsDB = productsDB.filter((item) => ids.includes(item.id));

	return [200, productsDB];
});

mock.onGet(/\/api\/ecommerce\/products\/[^/]+/).reply(({ url }) => {
	const { id } = url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;

	return [200, _.find(productsDB, { id })];
});

mock.onPut(/\/api\/ecommerce\/products\/[^/]+/).reply(({ url, data }: { url: string; data: string }) => {
	const { id } = url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;

	_.assign(_.find(productsDB, { id }), JSON.parse(data));

	return [200, _.find(productsDB, { id })];
});

mock.onDelete(/\/api\/ecommerce\/products\/[^/]+/).reply((config) => {
	const { id } = config.url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;

	_.remove(productsDB, { id });

	return [200, id];
});

mock.onGet('/api/ecommerce/orders').reply(() => {
	return [200, ordersDB];
});

mock.onPost('/api/ecommerce/orders').reply(({ data }: { data: string }) => {
	const newOrder = { id: FuseUtils.generateGUID(), ...JSON.parse(data) } as OrderType;

	ordersDB.push(newOrder);

	return [200, newOrder];
});

mock.onDelete('/api/ecommerce/orders').reply(({ data }: { data: string }) => {
	const ids = JSON.parse(data) as string[];
	ordersDB = ordersDB.filter((item) => ids.includes(item.id));

	return [200, ordersDB];
});

mock.onGet(/\/api\/ecommerce\/orders\/[^/]+/).reply(({ url }) => {
	const { id } = url.match(/\/api\/ecommerce\/orders\/(?<id>[^/]+)/).groups;

	return [200, _.find(ordersDB, { id })];
});

mock.onPut(/\/api\/ecommerce\/orders\/[^/]+/).reply(({ url, data }: { url: string; data: string }) => {
	const { id } = url.match(/\/api\/ecommerce\/orders\/(?<id>[^/]+)/).groups;

	_.assign(_.find(ordersDB, { id }), JSON.parse(data) as OrderType);

	return [200, _.find(ordersDB, { id })];
});

mock.onDelete(/\/api\/ecommerce\/orders\/[^/]+/).reply((config) => {
	const { id } = config.url.match(/\/api\/ecommerce\/orders\/(?<id>[^/]+)/).groups;

	_.remove(ordersDB, { id });

	return [200, id];
});
