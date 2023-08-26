type DateString = string;

type DataPoint = {
	x: DateString;
	y: number;
};

type SeriesData = {
	name: string;
	data: DataPoint[];
};

type Series = {
	[key: string]: SeriesData[];
};

type Ranges = {
	[key: string]: string;
};

type VisitorsOverviewWidgetType = {
	ranges: Ranges;
	series: Series;
};

export default VisitorsOverviewWidgetType;
