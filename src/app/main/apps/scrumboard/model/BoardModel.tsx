import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { LabelsType } from './LabelModel';

type CardIdType = string;

export type BoardListType = {
	id: string;
	cards: CardIdType[];
};

export type CardIdsType = CardIdType[];

export type BoardListsType = BoardListType[];

type SettingsType = {
	subscribed: boolean;
	cardCoverImages: boolean;
};

export type BoardType = {
	id: string;
	title: string;
	description: string;
	lastActivity: string;
	icon: string;
	members: string[];
	settings: SettingsType;
	lists: BoardListsType;
	labels: LabelsType;
};

export type BoardsType = BoardType[];

function BoardModel(data: PartialDeep<BoardType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: 'Untitled Board',
		description: '',
		icon: 'heroicons-outline:template',
		lastActivity: new Date(),
		members: [],
		settings: {
			subscribed: true,
			cardCoverImages: true
		},
		lists: [],
		labels: []
	});
}

export default BoardModel;
