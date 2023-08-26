type GithubIssueOverviewData = {
	[key: string]: number;
};

type GithubIssueSeriesData = {
	name: string;
	type: string;
	data: number[];
};

type GithubIssuesDataType = {
	overview: Record<string, GithubIssueOverviewData>;
	ranges: Record<string, string>;
	labels: string[];
	series: Record<string, GithubIssueSeriesData[]>;
};

export default GithubIssuesDataType;
