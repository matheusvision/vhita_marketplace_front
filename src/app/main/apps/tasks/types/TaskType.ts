type SubTask = {
	id: string;
	title: string;
	completed: boolean;
};

export type TaskType = {
	id: string;
	type: string;
	title: string;
	notes: string;
	completed: boolean;
	dueDate: string;
	priority: number;
	tags: string[];
	assignedTo: null | string;
	subTasks: SubTask[];
	order: number;
};

export type TasksType = TaskType[];
