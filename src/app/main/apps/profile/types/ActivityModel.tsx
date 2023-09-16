import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import UserModel, { UserType } from './UserModel';

export type ActivityType = {
	id: string;
	user: UserType;
	message: string;
	time: string;
};

export type ActivitiesType = ActivityType[];

function ActivityModel(data: PartialDeep<ActivityType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		user: {},
		message: UserModel({}),
		time: ''
	});
}

export default ActivityModel;
