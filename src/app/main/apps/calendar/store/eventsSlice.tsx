import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import formatISO from 'date-fns/formatISO';
import { RootState } from 'app/store/index';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { selectSelectedLabels } from './labelsSlice';
import { EventModelType } from '../model/EventModel';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getEvents = createAppAsyncThunk('calendarApp/events/getEvents', async () => {
	const response = await axios.get('/api/calendar/events');

	const data = (await response.data) as EventModelType[];

	return data;
});

export const addEvent = createAppAsyncThunk<EventModelType, EventModelType>(
	'calendarApp/events/addEvent',
	async (newEvent) => {
		const response = await axios.post('/api/calendar/events', newEvent);

		const data = (await response.data) as EventModelType;

		return data;
	}
);

export const updateEvent = createAppAsyncThunk<EventModelType, EventModelType>(
	'calendarApp/events/updateEvent',
	async (event) => {
		const response = await axios.put(`/api/calendar/events/${event.id}`, event);

		const data = (await response.data) as EventModelType;

		return data;
	}
);

export const removeEvent = createAppAsyncThunk<string, string>('calendarApp/events/removeEvent', async (eventId) => {
	const response = await axios.delete(`/api/calendar/events/${eventId}`);

	const data = (await response.data) as string;

	return data;
});

const eventsAdapter = createEntityAdapter<EventModelType>();

export type EventDialogType = {
	type: 'new' | 'edit';
	props?: {
		open?: boolean;
		anchorPosition?: { top: number; left: number };
	};
	data?: DeepPartial<EventModelType> | null;
};

const initialState = eventsAdapter.getInitialState<{ eventDialog: EventDialogType }>({
	eventDialog: {
		type: 'new',
		props: {
			open: false,
			anchorPosition: { top: 200, left: 400 }
		},
		data: null
	}
});

export const {
	selectAll: selectEvents,
	selectIds: selectEventIds,
	selectById: selectEventById
} = eventsAdapter.getSelectors((state: AppRootState) => state.calendarApp.events);

const eventsSlice = createSlice({
	name: 'calendarApp/events',
	initialState,
	reducers: {
		openNewEventDialog: {
			prepare: (selectInfo: Partial<DateSelectArg>) => {
				const { start, end, jsEvent } = selectInfo;
				const payload: EventDialogType = {
					type: 'new',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						start: formatISO(new Date(start)),
						end: formatISO(new Date(end))
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload as EventDialogType;
			}
		},
		openEditEventDialog: {
			prepare: (clickInfo: EventClickArg) => {
				const { jsEvent, event } = clickInfo;
				const { id, title, allDay, start, end, extendedProps } = event;

				const payload: EventDialogType = {
					type: 'edit',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						id,
						title,
						allDay,
						extendedProps,
						start: formatISO(new Date(start)),
						end: formatISO(new Date(end))
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload as EventDialogType;
			}
		},
		closeNewEventDialog: (state) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: false,
					anchorPosition: { top: 200, left: 400 }
				},
				data: null
			};
		},
		closeEditEventDialog: (state) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: false,
					anchorPosition: { top: 200, left: 400 }
				},
				data: null
			};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEvents.fulfilled, (state, action) => eventsAdapter.setAll(state, action.payload))
			.addCase(addEvent.fulfilled, (state, action) => eventsAdapter.addOne(state, action.payload))
			.addCase(updateEvent.fulfilled, (state, action) => eventsAdapter.upsertOne(state, action.payload))
			.addCase(removeEvent.fulfilled, (state, action) => eventsAdapter.removeOne(state, action.payload));
	}
});

type AppRootState = RootState<typeof eventsSlice>;

export const { openNewEventDialog, closeNewEventDialog, openEditEventDialog, closeEditEventDialog } =
	eventsSlice.actions;

export const selectFilteredEvents = createSelector([selectSelectedLabels, selectEvents], (selectedLabels, events) => {
	return events.filter((item) => selectedLabels.includes(item.extendedProps.label));
});

export const selectEventDialog = (state: AppRootState) => state.calendarApp.events.eventDialog;

export default eventsSlice.reducer;
