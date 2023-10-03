export type CommentType = {
	id: string;
	type: string;
	idMember: string;
	message: string;
	time: number;
};

export type CommentsType = CommentType[];
