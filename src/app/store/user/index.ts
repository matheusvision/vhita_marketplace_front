import { FuseSettingsConfigProps } from '@fuse/core/FuseSettings/FuseSettings';

export type UserProps = {
	role?: string[];
	data?: {
		displayName?: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigProps>;
	};
	loginRedirectUrl?: string;
};
