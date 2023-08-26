type ExpensesSeriesData = {
	name: string;
	data: number[];
};

type ExpensesDataType = {
	amount: number;
	labels: string[];
	series: ExpensesSeriesData[];
};

export default ExpensesDataType;
