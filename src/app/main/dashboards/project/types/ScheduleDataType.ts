type ScheduleItem = {
	title: string;
	time: string;
	location?: string;
};

type ScheduleDataType = {
	ranges: Record<string, string>;
	series: Record<string, ScheduleItem[]>;
};

export default ScheduleDataType;
