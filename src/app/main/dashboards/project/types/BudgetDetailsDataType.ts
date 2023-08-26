type BudgetDetailsRow = {
	type: string;
	total: number;
	expensesAmount: number;
	expensesPercentage: number;
	remainingAmount: number;
	remainingPercentage: number;
};

type BudgetDetailsDataType = {
	columns: string[];
	rows: BudgetDetailsRow[];
};

export default BudgetDetailsDataType;
