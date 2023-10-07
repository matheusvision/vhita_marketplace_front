import FuseUtils from '@fuse/utils';
import getUnixTime from 'date-fns/getUnixTime';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CommentType } from '../types/CommentType';

/**
 * The comment model.
 * @param data The comment data.
 * @returns The comment model.
 */
function CommentModel(data: PartialDeep<CommentType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		type: 'comment',
		idMember: null,
		message: '',
		time: getUnixTime(new Date())
	});
}

export default CommentModel;
