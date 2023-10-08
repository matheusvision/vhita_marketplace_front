import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { TaskType } from '../types/TaskType';

/**
 * The task model.
 * @param data The task data.
 * @returns The task model.
 */
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
