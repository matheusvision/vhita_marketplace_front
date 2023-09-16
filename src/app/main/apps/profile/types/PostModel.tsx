import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import UserModel, { UserType } from './UserModel';
import { CommentsType } from './CommentModel';

type MediaType = {
	type: string;
	preview: string;
};

type ArticleType = {
	title: string;
	subtitle: string;
	excerpt: string;
	media: MediaType;
};

export type PostType = {
	id: string;
	user: UserType;
	message: string;
	time: string;
	type: 'post' | 'article' | 'something' | 'video';
	like: number;
	share: number;
	media?: MediaType;
	article?: ArticleType;
	comments?: CommentsType;
};

export type PostsType = PostType[];

function PostModel(data: PartialDeep<PostType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		user: UserModel({}),
		message: '',
		time: '',
		type: '',
		like: 0,
		share: 0,
		media: {
			type: 'i',
			preview: ''
		},
		comments: []
	});
}

export default PostModel;
