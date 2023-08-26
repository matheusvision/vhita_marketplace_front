type Series = {
	name: string;
	data: number[];
};

type ConversionsWidgetType = {
	amount: number;
	labels: string[];
	series: Series[];
};

export default ConversionsWidgetType;
