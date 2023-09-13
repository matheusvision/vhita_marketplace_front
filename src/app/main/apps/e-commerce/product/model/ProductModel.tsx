import _ from '@lodash';
import { PartialDeep } from 'type-fest';

type Image = {
	id: string;
	url: string;
	type: string;
};

export type ProductType = {
	id: string;
	name: string;
	handle: string;
	description: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: Image[];
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
	price: string;
	image: string;
	total: string;
};

export type ProductsType = ProductType[];

const ProductModel = (data: PartialDeep<ProductType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('product-'),
		name: '',
		handle: '',
		description: '',
		categories: [],
		tags: [],
		featuredImageId: '',
		images: [],
		priceTaxExcl: null,
		priceTaxIncl: null,
		taxRate: null,
		comparedPrice: null,
		quantity: null,
		sku: '',
		width: '',
		height: '',
		depth: '',
		weight: '',
		extraShippingFee: null,
		price: '',
		active: true,
		image: '',
		total: ''
	});

export default ProductModel;
