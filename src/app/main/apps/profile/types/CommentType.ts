import { UserType } from './UserType';

export type CommentType = {
	id: string;
	user: UserType;
	time: string;
	message: string;
};

export type CommentsType = CommentType[];
