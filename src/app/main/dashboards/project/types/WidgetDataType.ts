type ExtraData = {
	name: string;
	count: number;
};

type WidgetInnerData = {
	name: string;
	count: number;
	extra: ExtraData;
};

/**
 * The type definition for the data used to populate the widget.
 */
type WidgetDataType = {
	title?: string;
	ranges?: Record<string, string>;
	currentRange?: string;
	data?: WidgetInnerData;
	detail?: string;
};

export default WidgetDataType;
