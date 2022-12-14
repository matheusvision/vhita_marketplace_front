import { FuseSettingsProps } from '@fuse/core/FuseSettings';

export interface UserProps {
	role?: string[];
	data?: {
		displayName?: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsProps>;
	};
	loginRedirectUrl?: string;
}
