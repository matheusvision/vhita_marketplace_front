type SeriesItem = {
	name: string;
	data: number[];
};

type ImpressionsWidgetType = {
	amount: number;
	labels: string[];
	series: SeriesItem[];
};

export default ImpressionsWidgetType;
