import { UserType } from './UserType';

export type ActivityType = {
	id: string;
	user: UserType;
	message: string;
	time: string;
};

export type ActivitiesType = ActivityType[];
