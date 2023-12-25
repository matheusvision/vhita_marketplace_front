import { apiService as api } from 'app/store/apiService';
import { AppRootStateType } from './store';

export const addTagTypes = [
	'notes_list',
	'notes_item',
	'notes_label_list',
	'notes_label_item',
	'notes_archived_note_list',
	'notes_reminder_note_list'
] as const;

const NotesApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getNotesNoteList: build.query<GetNotesNoteListApiResponse, GetNotesNoteListApiArg>({
				query: (routeParams) => {
					const { filter, id } = routeParams;
					let url = '';

					if (filter === 'labels') {
						url = `/mock-api/notes/labels/${id}`;
					}

					if (filter === 'archive') {
						url = `/mock-api/notes/archive`;
					}

					if (filter === 'reminders') {
						url = `/mock-api/notes/reminders`;
					}

					if (!filter) {
						url = `/mock-api/notes`;
					}

					return {
						url
					};
				},
				providesTags: ['notes_list']
			}),
			createNotesNote: build.mutation<CreateNotesNoteApiResponse, CreateNotesNoteApiArg>({
				query: (note) => ({
					url: `/mock-api/notes`,
					method: 'POST',
					data: note
				}),
				invalidatesTags: ['notes_list', 'notes_item']
			}),
			getNotesNote: build.query<GetNotesNoteApiResponse, GetNotesNoteApiArg>({
				query: (queryArg) => ({ url: `/mock-api/notes/${queryArg.noteId}` }),
				providesTags: ['notes_item']
			}),
			updateNotesNote: build.mutation<UpdateNotesNoteApiResponse, UpdateNotesNoteApiArg>({
				query: (note) => ({
					url: `/mock-api/notes/${note.id}`,
					method: 'PUT',
					data: note
				}),
				invalidatesTags: ['notes_item', 'notes_list']
			}),
			deleteNotesNote: build.mutation<DeleteNotesNoteApiResponse, DeleteNotesNoteApiArg>({
				query: (noteId) => ({
					url: `/mock-api/notes/${noteId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_list']
			}),
			getNotesLabelList: build.query<GetNotesLabelListApiResponse, GetNotesLabelListApiArg>({
				query: () => ({ url: `/mock-api/notes/labels` }),
				providesTags: ['notes_label_list']
			}),
			createNotesLabel: build.mutation<CreateNotesLabelApiResponse, CreateNotesLabelApiArg>({
				query: (noteLabel) => ({
					url: `/mock-api/notes/labels`,
					method: 'POST',
					data: noteLabel
				}),
				invalidatesTags: ['notes_label_item', 'notes_label_list']
			}),
			getNotesLabel: build.query<GetNotesLabelApiResponse, GetNotesLabelApiArg>({
				query: (queryArg) => ({ url: `/mock-api/notes/labels/${queryArg.labelId}` }),
				providesTags: ['notes_label_item']
			}),
			updateNotesLabel: build.mutation<UpdateNotesLabelApiResponse, UpdateNotesLabelApiArg>({
				query: (notesLabel) => ({
					url: `/mock-api/notes/labels/${notesLabel.id}`,
					method: 'PUT',
					data: notesLabel
				}),
				invalidatesTags: ['notes_label_list']
			}),
			deleteNotesLabel: build.mutation<DeleteNotesLabelApiResponse, DeleteNotesLabelApiArg>({
				query: (labelId) => ({
					url: `/mock-api/notes/labels/${labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_label_list']
			}),
			getNotesArchivedNoteList: build.query<GetNotesArchivedNoteListApiResponse, GetNotesArchivedNoteListApiArg>({
				query: () => ({ url: `/mock-api/notes/archive` }),
				providesTags: ['notes_archived_note_list']
			}),
			getNotesReminderNoteList: build.query<GetNotesReminderNoteListApiResponse, GetNotesReminderNoteListApiArg>({
				query: () => ({ url: `/mock-api/notes/reminder` }),
				providesTags: ['notes_reminder_note_list']
			})
		}),
		overrideExisting: false
	});
export { NotesApi };

export type RouteParams = Partial<{
	filter: string;
	id: string;
}>;

export type GetNotesNoteListApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesNoteListApiArg = RouteParams;

export type CreateNotesNoteApiResponse = unknown;
export type CreateNotesNoteApiArg = NotesNote;

export type GetNotesNoteApiResponse = /** status 200 OK */ NotesNote;
export type GetNotesNoteApiArg = {
	/** note id */
	noteId: string;
};

export type UpdateNotesNoteApiResponse = unknown;
export type UpdateNotesNoteApiArg = NotesNote;

export type DeleteNotesNoteApiResponse = unknown;
export type DeleteNotesNoteApiArg = string;

export type GetNotesLabelListApiResponse = /** status 200 OK */ NotesLabel[];
export type GetNotesLabelListApiArg = void;

export type CreateNotesLabelApiResponse = unknown;
export type CreateNotesLabelApiArg = NotesLabel;

export type GetNotesLabelApiResponse = /** status 200 OK */ NotesLabel;
export type GetNotesLabelApiArg = {
	/** label id */
	labelId: string;
};

export type UpdateNotesLabelApiResponse = unknown;
export type UpdateNotesLabelApiArg = NotesLabel;

export type DeleteNotesLabelApiResponse = unknown;
export type DeleteNotesLabelApiArg = string;

export type GetNotesArchivedNoteListApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesArchivedNoteListApiArg = void;

export type GetNotesReminderNoteListApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesReminderNoteListApiArg = void;

export type NoteListItemType = {
	id: string;
	content: string;
	completed: boolean;
};

export type NotesNote = {
	id: string;
	title: string;
	content: string;
	tasks?: NoteListItemType[];
	image?: string | null;
	reminder?: string | null;
	labels: string[];
	archived: boolean;
	createdAt: string;
	updatedAt?: string | null;
};

export type NotesLabel = {
	id: string;
	title: string;
};

export const {
	useGetNotesNoteListQuery,
	useCreateNotesNoteMutation,
	useGetNotesNoteQuery,
	useUpdateNotesNoteMutation,
	useDeleteNotesNoteMutation,
	useGetNotesLabelListQuery,
	useCreateNotesLabelMutation,
	useGetNotesLabelQuery,
	useUpdateNotesLabelMutation,
	useDeleteNotesLabelMutation,
	useGetNotesArchivedNoteListQuery,
	useGetNotesReminderNoteListQuery
} = NotesApi;

export type NotesApiType = {
	[NotesApi.reducerPath]: ReturnType<typeof NotesApi.reducer>;
};

export const selectNoteList = (routeParams: RouteParams) => (state: AppRootStateType) =>
	NotesApi.endpoints.getNotesNoteList.select(routeParams)(state)?.data ?? [];
