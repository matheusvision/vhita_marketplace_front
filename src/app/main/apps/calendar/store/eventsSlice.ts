import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { DeepPartial } from 'react-hook-form';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import formatISO from 'date-fns/formatISO';
import { selectSelectedLabels } from './labelsSlice';
import { CalendarApiType, Event, selectEvents } from '../CalendarApi';

type AppRootStateType = RootStateType<eventsSliceType> & CalendarApiType;

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export type EventDialogType = {
	type: 'new' | 'edit';
	props: {
		open: boolean;
		anchorPosition?: { top: number; left: number };
	};
	data?: DeepPartial<Event> | null;
};

const initialState: { eventDialog: EventDialogType } = {
	eventDialog: {
		type: 'new',
		props: {
			open: false,
			anchorPosition: { top: 200, left: 400 }
		},
		data: null
	}
};

/**
 * The Calendar App events slice.
 */
export const eventsSlice = createSlice({
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
						start: formatISO(start),
						end: formatISO(end)
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
						start: formatISO(start),
						end: formatISO(end)
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
	}
});

export const { openNewEventDialog, closeNewEventDialog, openEditEventDialog, closeEditEventDialog } =
	eventsSlice.actions;

export const selectFilteredEvents = createSelector([selectSelectedLabels, selectEvents], (selectedLabels, events) => {
	return events.filter((item) => selectedLabels.includes(item?.extendedProps?.label as string));
});

export const selectEventDialog = (state: AppRootStateType) => state.calendarApp.events.eventDialog;

export type eventsSliceType = typeof eventsSlice;

export default eventsSlice.reducer;
