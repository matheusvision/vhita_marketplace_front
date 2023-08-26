type BudgetDistributionSeriesData = {
	name: string;
	data: number[];
};

type BudgetDistributionDataType = {
	categories: string[];
	series: BudgetDistributionSeriesData[];
};

export default BudgetDistributionDataType;
