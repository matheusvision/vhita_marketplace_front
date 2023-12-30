import { apiService as api } from 'app/store/apiService';
import { DropResult } from 'react-beautiful-dnd';
import { PartialDeep } from 'type-fest';
import BoardModel from './models/BoardModel';
import { AppRootStateType } from './store';
import CardModel from './models/CardModel';
import reorder, { reorderQuoteMap } from './store/reorder';
import _ from '../../../../@lodash/@lodash';

export const addTagTypes = [
	'scrumboard_member_list',
	'scrumboard_board_list_items',
	'scrumboard_member',
	'scrumboard_board_list_item',
	'scrumboard_board_label_items',
	'scrumboard_board_label_item',
	'scrumboard_board_card_items',
	'scrumboard_board_card_item',
	'scrumboard_board_list',
	'scrumboard_board'
] as const;
const ScrumboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getScrumboardMemberList: build.query<GetScrumboardMemberListApiResponse, GetScrumboardMemberListApiArg>({
				query: () => ({ url: `/mock-api/scrumboard/members` }),
				providesTags: ['scrumboard_member_list']
			}),
			createScrumboardMember: build.mutation<CreateScrumboardMemberApiResponse, CreateScrumboardMemberApiArg>({
				query: (member) => ({
					url: `/mock-api/scrumboard/members`,
					method: 'POST',
					data: member
				}),
				invalidatesTags: ['scrumboard_member_list']
			}),
			getScrumboardBoardListItems: build.query<
				GetScrumboardBoardListItemsApiResponse,
				GetScrumboardBoardListItemsApiArg
			>({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/lists`
				}),
				providesTags: ['scrumboard_board_list_items']
			}),
			createScrumboardBoardList: build.mutation<
				CreateScrumboardBoardListApiResponse,
				CreateScrumboardBoardListApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists`,
					method: 'POST',
					data: queryArg.list
				}),
				invalidatesTags: ['scrumboard_board_list_items', 'scrumboard_board']
			}),
			getScrumboardMember: build.query<GetScrumboardMemberApiResponse, GetScrumboardMemberApiArg>({
				query: (memberId) => ({
					url: `/mock-api/scrumboard/members/${memberId}`
				}),
				providesTags: ['scrumboard_member']
			}),
			updateScrumboardMember: build.mutation<UpdateScrumboardMemberApiResponse, UpdateScrumboardMemberApiArg>({
				query: (member) => ({
					url: `/mock-api/scrumboard/members/${member.id}`,
					method: 'PUT',
					data: member
				}),
				invalidatesTags: ['scrumboard_member']
			}),
			deleteScrumboardMember: build.mutation<DeleteScrumboardMemberApiResponse, DeleteScrumboardMemberApiArg>({
				query: (memberId) => ({
					url: `/mock-api/scrumboard/members/${memberId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_member_list']
			}),
			getScrumboardBoardListItem: build.query<
				GetScrumboardBoardListItemApiResponse,
				GetScrumboardBoardListItemApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}`
				}),
				providesTags: ['scrumboard_board_list_items']
			}),
			updateScrumboardBoardList: build.mutation<
				UpdateScrumboardBoardListApiResponse,
				UpdateScrumboardBoardListApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.list.id}`,
					method: 'PUT',
					data: queryArg.list
				}),
				invalidatesTags: ['scrumboard_board_list_items']
			}),
			deleteScrumboardBoardList: build.mutation<
				DeleteScrumboardBoardListApiResponse,
				DeleteScrumboardBoardListApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_list_items', 'scrumboard_board']
			}),
			getScrumboardBoardLabelList: build.query<
				GetScrumboardBoardLabelListApiResponse,
				GetScrumboardBoardLabelListApiArg
			>({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/labels`
				}),
				providesTags: ['scrumboard_board_label_items']
			}),
			createScrumboardBoardLabel: build.mutation<
				CreateScrumboardBoardLabelApiResponse,
				CreateScrumboardBoardLabelApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels`,
					method: 'POST',
					data: queryArg.label
				}),
				invalidatesTags: ['scrumboard_board_label_items']
			}),
			getScrumboardBoardLabel: build.query<GetScrumboardBoardLabelApiResponse, GetScrumboardBoardLabelApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.labelId}`
				}),
				providesTags: ['scrumboard_board_label_item']
			}),
			updateScrumboardBoardLabel: build.mutation<
				UpdateScrumboardBoardLabelApiResponse,
				UpdateScrumboardBoardLabelApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.label.id}`,
					method: 'PUT',
					data: queryArg.label
				}),
				invalidatesTags: ['scrumboard_board_label_item']
			}),
			deleteScrumboardBoardLabel: build.mutation<
				DeleteScrumboardBoardLabelApiResponse,
				DeleteScrumboardBoardLabelApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_label_items']
			}),
			getScrumboardBoardCardList: build.query<
				GetScrumboardBoardCardListApiResponse,
				GetScrumboardBoardCardListApiArg
			>({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/cards`
				}),
				providesTags: ['scrumboard_board_card_items']
			}),
			createScrumboardBoardCard: build.mutation<
				CreateScrumboardBoardCardApiResponse,
				CreateScrumboardBoardCardApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}/cards`,
					method: 'POST',
					data: CardModel(queryArg.card)
				}),
				invalidatesTags: ['scrumboard_board_card_items', 'scrumboard_board']
			}),
			updateScrumboardBoardCard: build.mutation<
				UpdateScrumboardBoardCardApiResponse,
				UpdateScrumboardBoardCardApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/cards/${queryArg.card.id}`,
					method: 'PUT',
					data: queryArg.card
				}),
				invalidatesTags: ['scrumboard_board_card_items']
			}),
			deleteScrumboardBoardCard: build.mutation<
				DeleteScrumboardBoardCardApiResponse,
				DeleteScrumboardBoardCardApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/cards/${queryArg.cardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_card_items']
			}),
			getScrumboardBoardList: build.query<GetScrumboardBoardListApiResponse, GetScrumboardBoardListApiArg>({
				query: () => ({ url: `/mock-api/scrumboard/boards` }),
				providesTags: ['scrumboard_board_list']
			}),
			createScrumboardBoard: build.mutation<CreateScrumboardBoardApiResponse, CreateScrumboardBoardApiArg>({
				query: (board) => ({
					url: `/mock-api/scrumboard/boards`,
					method: 'POST',
					data: BoardModel(board)
				}),
				invalidatesTags: ['scrumboard_board_list', 'scrumboard_board']
			}),
			getScrumboardBoard: build.query<GetScrumboardBoardApiResponse, GetScrumboardBoardApiArg>({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}`
				}),
				providesTags: ['scrumboard_board']
			}),
			updateScrumboardBoard: build.mutation<UpdateScrumboardBoardApiResponse, UpdateScrumboardBoardApiArg>({
				query: (board) => ({
					url: `/mock-api/scrumboard/boards/${board.id}`,
					method: 'PUT',
					data: board
				}),
				invalidatesTags: ['scrumboard_board']
			}),
			deleteScrumboardBoard: build.mutation<DeleteScrumboardBoardApiResponse, DeleteScrumboardBoardApiArg>({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_list']
			}),
			updateScrumboardBoardListOrder: build.mutation<
				UpdateScrumboardBoardListOrderApiResponse,
				UpdateScrumboardBoardListOrderApiArg
			>({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;

					const ordered = reorder(
						_.merge([], board.lists),
						orderResult.source.index,
						orderResult.destination.index
					);

					return {
						url: `/mock-api/scrumboard/boards/${board.id}`,
						method: 'PUT',
						data: { lists: ordered }
					};
				},
				invalidatesTags: ['scrumboard_board_list', 'scrumboard_board']
			}),
			updateScrumboardBoardCardOrder: build.mutation<
				UpdateScrumboardBoardCardOrderApiResponse,
				UpdateScrumboardBoardCardOrderApiArg
			>({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;

					const ordered = reorderQuoteMap(
						_.merge([], board.lists),
						orderResult.source,
						orderResult.destination
					);

					return {
						url: `/mock-api/scrumboard/boards/${board.id}`,
						method: 'PUT',
						data: { lists: ordered }
					};
				},
				invalidatesTags: ['scrumboard_board_list', 'scrumboard_board']
			})
		}),
		overrideExisting: false
	});
export default ScrumboardApi;

export type ScrumboardApiType = {
	[ScrumboardApi.reducerPath]: ReturnType<typeof ScrumboardApi.reducer>;
};

export type GetScrumboardMemberListApiResponse = /** status 200 OK */ ScrumboardMember[];
export type GetScrumboardMemberListApiArg = void;

export type CreateScrumboardMemberApiResponse = unknown;
export type CreateScrumboardMemberApiArg = ScrumboardMember;

export type GetScrumboardBoardListItemsApiResponse = /** status 200 OK */ ScrumboardList[];
export type GetScrumboardBoardListItemsApiArg = string /** board id */;

export type CreateScrumboardBoardListApiResponse = unknown;
export type CreateScrumboardBoardListApiArg = {
	boardId: string;
	list: PartialDeep<ScrumboardList>;
};

export type GetScrumboardMemberApiResponse = /** status 200 OK */ ScrumboardMember;
export type GetScrumboardMemberApiArg = string /** member id */;

export type UpdateScrumboardMemberApiResponse = unknown;
export type UpdateScrumboardMemberApiArg = PartialDeep<ScrumboardMember>;

export type DeleteScrumboardMemberApiResponse = unknown;
export type DeleteScrumboardMemberApiArg = string /** member id */;

export type GetScrumboardBoardListItemApiResponse = /** status 200 OK */ ScrumboardList;
export type GetScrumboardBoardListItemApiArg = {
	listId: string;
	boardId: string;
};

export type UpdateScrumboardBoardListApiResponse = unknown;
export type UpdateScrumboardBoardListApiArg = {
	boardId: string;
	list: PartialDeep<ScrumboardList>;
};

export type DeleteScrumboardBoardListApiResponse = unknown;
export type DeleteScrumboardBoardListApiArg = {
	listId: string;
	boardId: string;
};

export type GetScrumboardBoardLabelListApiResponse = /** status 200 OK */ ScrumboardLabel[];
export type GetScrumboardBoardLabelListApiArg = string /** board id */;

export type CreateScrumboardBoardLabelApiResponse = unknown;
export type CreateScrumboardBoardLabelApiArg = {
	boardId: string;
	label: PartialDeep<ScrumboardLabel>;
};

export type GetScrumboardBoardLabelApiResponse = /** status 200 OK */ ScrumboardLabel;
export type GetScrumboardBoardLabelApiArg = {
	labelId: string;
	boardId: string;
};

export type UpdateScrumboardBoardLabelApiResponse = unknown;
export type UpdateScrumboardBoardLabelApiArg = {
	boardId: string;
	label: PartialDeep<ScrumboardLabel>;
};

export type DeleteScrumboardBoardLabelApiResponse = unknown;
export type DeleteScrumboardBoardLabelApiArg = {
	labelId: string;
	boardId: string;
};

export type GetScrumboardBoardCardListApiResponse = /** status 200 OK */ ScrumboardCard[];
export type GetScrumboardBoardCardListApiArg = string /** board id */;

export type CreateScrumboardBoardCardApiResponse = unknown;
export type CreateScrumboardBoardCardApiArg = {
	boardId: string;
	listId: string;
	card: PartialDeep<ScrumboardCard>;
};

export type UpdateScrumboardBoardCardApiResponse = unknown;
export type UpdateScrumboardBoardCardApiArg = {
	boardId: string;
	card: PartialDeep<ScrumboardCard>;
};

export type DeleteScrumboardBoardCardApiResponse = unknown;
export type DeleteScrumboardBoardCardApiArg = {
	cardId: string;
	boardId: string;
};

export type GetScrumboardBoardListApiResponse = /** status 200 OK */ ScrumboardBoard[];
export type GetScrumboardBoardListApiArg = void;

export type CreateScrumboardBoardApiResponse = unknown;
export type CreateScrumboardBoardApiArg = PartialDeep<ScrumboardBoard>;

export type GetScrumboardBoardApiResponse = /** status 200 OK */ ScrumboardBoard;
export type GetScrumboardBoardApiArg = string /** board id */;

export type UpdateScrumboardBoardApiResponse = unknown;
export type UpdateScrumboardBoardApiArg = PartialDeep<ScrumboardBoard>;

export type DeleteScrumboardBoardApiResponse = unknown;
export type DeleteScrumboardBoardApiArg = string /** board id */;

export type UpdateScrumboardBoardListOrderApiResponse = unknown;
export type UpdateScrumboardBoardListOrderApiArg = {
	orderResult: {
		source: DropResult['source'];
		destination: DropResult['destination'];
	};
	board: ScrumboardBoard;
};
export type UpdateScrumboardBoardCardOrderApiResponse = unknown;
export type UpdateScrumboardBoardCardOrderApiArg = {
	orderResult: {
		source: DropResult['source'];
		destination: DropResult['destination'];
	};
	board: ScrumboardBoard;
};

export type ScrumboardMember = {
	id: string;
	name: string;
	avatar: string;
	class: string;
};

export type ScrumboardList = {
	id: string;
	boardId: string;
	title: string;
};
export type ScrumboardBoardList = {
	id: string;
	cards: ScrumboardCard['id'][];
};

export type ScrumboardLabel = {
	id: string;
	boardId: string;
	title: string;
};

export type ScrumboardAttachment = {
	id: string;
	name: string;
	src: string;
	url: string;
	time: number;
	type: string;
};
export type ScrumboardCheckListItem = {
	id: number;
	name: string;
	checked: boolean;
};

export type ScrumboardChecklist = {
	id?: string;
	name: string;
	checkItems: ScrumboardCheckListItem[];
};

export type ScrumboardCard = {
	id: string;
	boardId: string;
	listId: string;
	title: string;
	description: string;
	labels: string[];
	dueDate?: number | null;
	attachmentCoverId: string;
	memberIds: string[];
	attachments: ScrumboardAttachment[];
	subscribed: boolean;
	checklists: ScrumboardChecklist[];
	activities: {
		id: string;
		type: string;
		idMember: string;
		message: string;
		time: number;
	}[];
};

export type ScrumboardBoard = {
	id: string;
	title: string;
	description: string;
	icon: string;
	lastActivity: string;
	members: string[];
	settings: {
		subscribed: boolean;
		cardCoverImages: boolean;
	};
	lists: {
		id: string;
		cards?: string[];
	}[];
};

export type ScrumboardComment = {
	id: string;
	type: string;
	idMember: string;
	message: string;
	time: number;
};

export const {
	useGetScrumboardMemberListQuery,
	useCreateScrumboardMemberMutation,
	useGetScrumboardBoardListItemsQuery,
	useCreateScrumboardBoardListMutation,
	useGetScrumboardMemberQuery,
	useUpdateScrumboardMemberMutation,
	useDeleteScrumboardMemberMutation,
	useGetScrumboardBoardListItemQuery,
	useUpdateScrumboardBoardListMutation,
	useDeleteScrumboardBoardListMutation,
	useGetScrumboardBoardLabelListQuery,
	useCreateScrumboardBoardLabelMutation,
	useGetScrumboardBoardLabelQuery,
	useUpdateScrumboardBoardLabelMutation,
	useDeleteScrumboardBoardLabelMutation,
	useGetScrumboardBoardCardListQuery,
	useCreateScrumboardBoardCardMutation,
	useUpdateScrumboardBoardCardMutation,
	useDeleteScrumboardBoardCardMutation,
	useGetScrumboardBoardListQuery,
	useCreateScrumboardBoardMutation,
	useGetScrumboardBoardQuery,
	useUpdateScrumboardBoardMutation,
	useDeleteScrumboardBoardMutation,
	useUpdateScrumboardBoardListOrderMutation,
	useUpdateScrumboardBoardCardOrderMutation
} = ScrumboardApi;

export const selectListById = (boardId: string, listId: string) => (state: AppRootStateType) => {
	const listItems = ScrumboardApi.endpoints.getScrumboardBoardListItems.select(boardId)(state)?.data ?? [];

	return _.find(listItems, { id: listId });
};

export const selectMemberById = (id: string) => (state: AppRootStateType) => {
	const members = ScrumboardApi.endpoints.getScrumboardMemberList.select()(state)?.data ?? [];

	return _.find(members, { id });
};

export const selectLabelById = (boardId: string, id: string) => (state: AppRootStateType) => {
	const labels = ScrumboardApi.endpoints.getScrumboardBoardLabelList.select(boardId)(state)?.data ?? [];

	return _.find(labels, { id });
};
