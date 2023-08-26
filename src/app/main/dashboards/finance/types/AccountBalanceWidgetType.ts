type DataPoint = {
	x: string;
	y: number;
};

type Series = {
	name: string;
	data: DataPoint[];
};

type AccountBalanceWidgetType = {
	growRate: number;
	ami: number;
	series: Series[];
};

export default AccountBalanceWidgetType;
