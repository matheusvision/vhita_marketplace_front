import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { AppRootStateType } from './store';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['eCommerce_products', 'eCommerce_product', 'eCommerce_orders', 'eCommerce_order'] as const;
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getECommerceProductList: build.query<GetECommerceProductListApiResponse, GetECommerceProductListApiArg>({
				query: () => ({ url: `/mock-api/ecommerce/products` }),
				providesTags: ['eCommerce_products']
			}),
			deleteECommerceProducts: build.mutation<DeleteECommerceProductsApiResponse, DeleteECommerceProductsApiArg>({
				query: (productIds) => ({
					url: `/mock-api/ecommerce/products`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['eCommerce_products']
			}),
			getECommerceProduct: build.query<GetECommerceProductApiResponse, GetECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`
				}),
				providesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			updateECommerceProduct: build.mutation<UpdateECommerceProductApiResponse, UpdateECommerceProductApiArg>({
				query: (product) => ({
					url: `/mock-api/ecommerce/products/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			deleteECommerceProduct: build.mutation<DeleteECommerceProductApiResponse, DeleteECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			getECommerceOrderList: build.query<GetECommerceOrderListApiResponse, GetECommerceOrderListApiArg>({
				query: () => ({ url: `/mock-api/ecommerce/orders` }),
				providesTags: ['eCommerce_orders']
			}),
			getECommerceOrder: build.query<GetECommerceOrderApiResponse, GetECommerceOrderApiArg>({
				query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
				providesTags: ['eCommerce_order']
			}),
			updateECommerceOrder: build.mutation<UpdateECommerceOrderApiResponse, UpdateECommerceOrderApiArg>({
				query: (order) => ({
					url: `/mock-api/ecommerce/orders/${order.id}`,
					method: 'PUT',
					data: order
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrder: build.mutation<DeleteECommerceOrderApiResponse, DeleteECommerceOrderApiArg>({
				query: (orderId) => ({
					url: `/mock-api/ecommerce/orders/${orderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrders: build.mutation<DeleteECommerceOrdersApiResponse, DeleteECommerceOrdersApiArg>({
				query: (ordersId) => ({
					url: `/mock-api/ecommerce/orders`,
					method: 'DELETE',
					data: ordersId
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			})
		}),
		overrideExisting: false
	});
export { ECommerceApi };

export type GetECommerceProductListApiResponse = /** status 200 OK */ EcommerceProduct[];
export type GetECommerceProductListApiArg = void;

export type DeleteECommerceProductsApiResponse = unknown;
export type DeleteECommerceProductsApiArg = string[]; /** Product ids */

export type GetECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
export type GetECommerceProductApiArg = string;

export type UpdateECommerceProductApiResponse = unknown;
export type UpdateECommerceProductApiArg = EcommerceProduct; // Product

export type DeleteECommerceProductApiResponse = unknown;
export type DeleteECommerceProductApiArg = string; // Product id

export type GetECommerceOrderListApiResponse = /** status 200 OK */ EcommerceOrder[];
export type GetECommerceOrderListApiArg = void;

export type GetECommerceOrderApiResponse = /** status 200 OK */ EcommerceOrder;
export type GetECommerceOrderApiArg = string; // Order id

export type UpdateECommerceOrderApiResponse = unknown;
export type UpdateECommerceOrderApiArg = EcommerceOrder; // Order

export type DeleteECommerceOrderApiResponse = unknown;
export type DeleteECommerceOrderApiArg = string; // Order id

export type DeleteECommerceOrdersApiResponse = unknown;
export type DeleteECommerceOrdersApiArg = string[]; // Orders id

export type EcommerceProductImageType = {
	id: string;
	url: string;
	type: string;
};

export type EcommerceProduct = {
	id: string;
	name: string;
	handle: string;
	description: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: EcommerceProductImageType[];
	priceTaxExcl: number;
	priceTaxIncl: number;
	taxRate: number;
	comparedPrice: number;
	quantity: number;
	sku: string;
	width: string;
	height: string;
	depth: string;
	weight: string;
	extraShippingFee: number;
	active: boolean;
};

export type EcommerceOrder = {
	id: string;
	reference: string;
	subtotal: string;
	tax: string;
	discount: string;
	total: string;
	date: string;
	customer: {
		id: string;
		firstName: string;
		lastName: string;
		avatar: string;
		company: string;
		jobTitle: string;
		email: string;
		phone: string;
		invoiceAddress: {
			address: string;
			lat: number;
			lng: number;
		};
		shippingAddress: {
			address: string;
			lat: number;
			lng: number;
		};
	};
	products: Partial<EcommerceProduct & { image: string; price: string }>[];
	status: {
		id: string;
		name: string;
		color: string;
		date?: string;
	}[];
	payment: {
		transactionId: string;
		amount: string;
		method: string;
		date: string;
	};
	shippingDetails: {
		tracking: string;
		carrier: string;
		weight: string;
		fee: string;
		date: string;
	}[];
};
export const {
	useGetECommerceProductListQuery,
	useDeleteECommerceProductsMutation,
	useGetECommerceProductQuery,
	useUpdateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useGetECommerceOrderListQuery,
	useGetECommerceOrderQuery,
	useUpdateECommerceOrderMutation,
	useDeleteECommerceOrderMutation,
	useDeleteECommerceOrdersMutation
} = ECommerceApi;

export default ECommerceApi;

export type ECommerceApiType = {
	[ECommerceApi.reducerPath]: ReturnType<typeof ECommerceApi.reducer>;
};

export const selectProductList = (state: AppRootStateType) =>
	ECommerceApi.endpoints.getECommerceProductList.select()(state)?.data ?? [];

/**
 * Select filtered orders
 */
export const selectFilteredProductList = createSelector(
	[selectProductList, selectSearchText],
	(products, searchText) => {
		if (searchText.length === 0) {
			return products;
		}
		return FuseUtils.filterArrayByString<EcommerceProduct>(products, searchText);
	}
);

export const selectOrderList = (state: AppRootStateType) =>
	ECommerceApi.endpoints.getECommerceOrderList.select()(state)?.data ?? [];

/**
 * Select filtered orders
 */
export const selectFilteredOrderList = createSelector([selectOrderList, selectSearchText], (orders, searchText) => {
	if (searchText.length === 0) {
		return orders;
	}
	return FuseUtils.filterArrayByString<EcommerceOrder>(orders, searchText);
});
