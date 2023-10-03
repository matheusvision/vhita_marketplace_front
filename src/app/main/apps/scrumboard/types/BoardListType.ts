import { CardType } from './CardType';

export type BoardListType = {
	id: string;
	cards: CardType['id'][];
};

export type BoardListsType = BoardListType[];
