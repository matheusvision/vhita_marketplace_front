type TransactionType = {
	id: string;
	date: string;
	name: string;
	amount: number;
	status: TransactionStatusType;
};

enum TransactionStatusType {
	COMPLETED = 'completed',
	PENDING = 'pending'
}

type RecentTransactionsWidgetType = {
	columns: string[];
	rows: TransactionType[];
};

export default RecentTransactionsWidgetType;
