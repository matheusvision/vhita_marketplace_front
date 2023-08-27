import _ from '@lodash';
import { DeepPartial } from 'react-hook-form';
import formatISO from 'date-fns/formatISO';
import { MouseEvent } from 'react';

export type SelectedEventType = {
	start: string;
	end: string;
	jsEvent: MouseEvent<HTMLElement>;
};

export type EventModelType = {
	id: string;
	title: string;
	allDay: boolean;
	start: string;
	end: string;
	extendedProps: { desc?: string; label?: string };
};

const EventModel = (data?: DeepPartial<EventModelType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		allDay: true,
		start: formatISO(new Date()),
		end: formatISO(new Date()),
		extendedProps: { desc: '', label: '' }
	});

export default EventModel;
