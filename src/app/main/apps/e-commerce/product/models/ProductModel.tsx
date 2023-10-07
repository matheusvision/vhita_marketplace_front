import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ProductType } from '../../types/ProductType';

/**
 * The product model.
 *
 * @param {PartialDeep<ProductType>} data - The data.
 * @returns {ProductType} The product.
 */
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
		priceTaxExcl: 0,
		priceTaxIncl: 0,
		taxRate: 0,
		comparedPrice: 0,
		quantity: 0,
		sku: '',
		width: '',
		height: '',
		depth: '',
		weight: '',
		extraShippingFee: 0,
		price: '',
		active: true,
		image: '',
		total: ''
	});

export default ProductModel;
