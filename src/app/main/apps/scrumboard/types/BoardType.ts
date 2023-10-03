import { LabelsType } from './LabelType';
import { BoardListsType } from './BoardListType';

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
