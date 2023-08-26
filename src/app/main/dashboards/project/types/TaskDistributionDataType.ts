type TaskDistributionOverviewData = {
	new: number;
	completed: number;
};

type TaskDistributionDataType = {
	ranges: Record<string, string>;
	overview: Record<string, TaskDistributionOverviewData>;
	labels: string[];
	series: Record<string, number[]>;
};

export default TaskDistributionDataType;
