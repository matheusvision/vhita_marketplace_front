/**
 * Event Type
 */
export type EventType = {
	id: string;
	title: string;
	allDay: boolean;
	start: string;
	end: string;
	extendedProps: { desc?: string; label?: string };
};
