import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';

type MediaType = {
	type: string;
	title: string;
	preview: string;
};

type AlbumType = {
	id: string;
	name: string;
	info: string;
	media: MediaType[];
};

export type AlbumsType = AlbumType[];

function AlbumModel(data: PartialDeep<AlbumType>) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		info: '',
		media: []
	});
}

export default AlbumModel;
