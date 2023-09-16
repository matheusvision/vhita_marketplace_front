import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import UserModel, { UserType } from './UserModel';

export type CommentType = {
	id: string;
	user: UserType;
	time: string;
	message: string;
};

export type CommentsType = CommentType[];

function CommentModel(data: PartialDeep<CommentType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		user: UserModel({}),
		time: '',
		message: ''
	});
}

export default CommentModel;
