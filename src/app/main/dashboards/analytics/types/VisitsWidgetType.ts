type Label = string;

interface SeriesItem {
	name: string;
	data: number[];
}

interface VisitsWidgetType {
	amount: number;
	labels: Label[];
	series: SeriesItem[];
}

export default VisitsWidgetType;
