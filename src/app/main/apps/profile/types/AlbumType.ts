import { MediaType } from './MediaType';

export type AlbumType = {
	id: string;
	name: string;
	info: string;
	media: MediaType[];
};
export type AlbumsType = AlbumType[];
