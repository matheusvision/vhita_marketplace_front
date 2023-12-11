import { apiService as api } from 'app/store/apiService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { createSelector } from '@reduxjs/toolkit';
import { Dictionary } from '@fullcalendar/core/internal';
import { setSelectedLabels } from './store/labelsSlice';

export const addTagTypes = ['calendar_events', 'calendar_event', 'calendar_labels', 'calendar_label'] as const;
const CalendarApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
				query: () => ({ url: `/mock-api/calendar/events` }),
				providesTags: ['calendar_events']
			}),
			createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/calendar/events`,
					method: 'POST',
					data: queryArg.Event
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			updateEvent: build.mutation<UpdateEventApiResponse, UpdateEventApiArg>({
				query: (Event) => ({
					url: `/mock-api/calendar/events/${Event.id}`,
					method: 'PUT',
					data: Event
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			deleteEvent: build.mutation<DeleteEventApiResponse, DeleteEventApiArg>({
				query: (id) => ({
					url: `/mock-api/calendar/events/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			getLabels: build.query<GetLabelsApiResponse, GetLabelsApiArg>({
				query: () => ({ url: `/mock-api/calendar/labels` }),
				providesTags: ['calendar_labels'],
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						const { data: labels } = await queryFulfilled;
						dispatch(setSelectedLabels(labels.map((item) => item.id)));
					} catch (err) {
						dispatch(showMessage({ message: 'Error loading Labels!' }));
					}
				}
			}),
			createLabel: build.mutation<CreateLabelApiResponse, CreateLabelApiArg>({
				query: (Label) => {
					return {
						url: `/mock-api/calendar/labels`,
						method: 'POST',
						data: Label
					};
				},
				invalidatesTags: ['calendar_label', 'calendar_labels']
			}),
			updateLabel: build.mutation<UpdateLabelApiResponse, UpdateLabelApiArg>({
				query: (Label) => ({
					url: `/mock-api/calendar/labels/${Label.id}`,
					method: 'PUT',
					data: Label
				}),
				invalidatesTags: ['calendar_labels']
			}),
			deleteLabel: build.mutation<DeleteLabelApiResponse, DeleteLabelApiArg>({
				query: (id) => ({
					url: `/mock-api/calendar/labels/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_events', 'calendar_labels']
			})
		}),
		overrideExisting: false
	});

export type GetEventsApiResponse = /** status 200 OK */ Event[];
export type GetEventsApiArg = void;
export type CreateEventApiResponse = /** status 200 OK */ Event;
export type CreateEventApiArg = {
	Event: Event;
};
export type UpdateEventApiResponse = /** status 200 OK */ Event;
export type UpdateEventApiArg = Event;
export type DeleteEventApiResponse = unknown;
export type DeleteEventApiArg = string;
export type GetLabelsApiResponse = /** status 200 OK */ Label[];
export type GetLabelsApiArg = void;
export type CreateLabelApiResponse = /** status 200 OK */ Label;
export type CreateLabelApiArg = Label;
export type UpdateLabelApiResponse = /** status 200 OK */ Label;
export type UpdateLabelApiArg = Label;
export type DeleteLabelApiResponse = unknown;
export type DeleteLabelApiArg = string;
export type Event = {
	id: string;
	title: string;
	allDay: boolean;
	start: string;
	end: string;
	extendedProps?: Dictionary;
};
export type Label = {
	id: string;
	title: string;
	color: string;
};
export const {
	useGetEventsQuery,
	useCreateEventMutation,
	useUpdateEventMutation,
	useDeleteEventMutation,
	useGetLabelsQuery,
	useCreateLabelMutation,
	useUpdateLabelMutation,
	useDeleteLabelMutation
} = CalendarApi;

export default CalendarApi;

export type CalendarApiType = {
	[CalendarApi.reducerPath]: ReturnType<typeof CalendarApi.reducer>;
};

export const selectEvents = (state: CalendarApiType) => CalendarApi.endpoints.getEvents.select()(state)?.data ?? [];
export const selectLabels = (state: CalendarApiType) => CalendarApi.endpoints.getLabels.select()(state)?.data ?? [];

export const selectFirstLabelId = createSelector([selectLabels], (labels) => labels[0]?.id ?? null);
