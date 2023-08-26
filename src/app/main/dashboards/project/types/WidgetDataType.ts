type ExtraData = {
	name: string;
	count: number;
};

type WidgetInnerData = {
	name: string;
	count: number;
	extra: ExtraData;
};

type WidgetDataType = {
	title?: string;
	ranges?: Record<string, string>;
	currentRange?: string;
	data?: WidgetInnerData;
	detail?: string;
};

export default WidgetDataType;
