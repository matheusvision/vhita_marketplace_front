type Transaction = {
	id: string;
	date: string;
	name: string;
	amount: number;
	status: TransactionStatus;
};

enum TransactionStatus {
	COMPLETED = 'completed',
	PENDING = 'pending'
}

type RecentTransactionsWidgetType = {
	columns: string[];
	rows: Transaction[];
};

export default RecentTransactionsWidgetType;
