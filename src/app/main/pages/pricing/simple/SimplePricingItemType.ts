import { ReactNode } from 'react';

type SimplePricingItemType = {
	period?: 'month' | 'year';
	title?: string;
	subtitle?: string;
	yearlyPrice?: string;
	monthlyPrice?: string;
	buttonTitle?: string;
	isPopular?: boolean;
	icon?: string;
	details?: ReactNode;
};

export default SimplePricingItemType;
