export { default } from './FuseSettings';

export interface FuseSettingsProps {
	layout?: {
		style?: string;
		config?: Record<string, unknown>;
	};
	customScrollbars?: boolean;
	direction?: 'rtl' | 'ltr';
	theme?: {
		main?: Record<string, unknown>;
		navbar?: Record<string, unknown>;
		toolbar?: Record<string, unknown>;
		footer?: Record<string, unknown>;
	};
	defaultAuth?: string[];
	loginRedirectUrl?: string;
}
