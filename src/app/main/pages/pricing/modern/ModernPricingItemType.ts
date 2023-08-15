import { ReactNode } from 'react';

export type ModernPricingItemType = {
	period?: 'month' | 'year';
	title?: string;
	subtitle?: string;
	yearlyPrice?: string;
	monthlyPrice?: string;
	buttonTitle?: string;
	isPopular?: boolean;
	details?: ReactNode;
	icon?: string;
};

export default ModernPricingItemType;
