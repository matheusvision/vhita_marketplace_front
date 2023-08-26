type DateString = string;

interface DataPoint {
	x: DateString;
	y: number;
}

interface Series {
	name: string;
	data: DataPoint[];
}

interface VisitorsVsPageViewsType {
	overallScore: number;
	averageRatio: number;
	predictedRatio: number;
	series: Series[];
}

export default VisitorsVsPageViewsType;
