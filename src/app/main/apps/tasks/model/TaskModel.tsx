import _ from '@lodash';
import { PartialDeep } from 'type-fest';

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

const TaskModel = (data: PartialDeep<TaskType>) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		type: 'task',
		title: '',
		notes: '',
		completed: false,
		dueDate: null,
		priority: 0,
		tags: [],
		assignedTo: null,
		subTasks: [],
		order: 1
	}) as TaskType;

export default TaskModel;
