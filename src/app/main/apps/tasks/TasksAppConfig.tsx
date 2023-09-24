import lazyWithSlices from 'app/store/lazyWithSlices';
import TaskForm from './task/TaskForm';
import slices from './store';

const TasksApp = lazyWithSlices(() => import('./TasksApp'), slices);

const TasksAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/tasks',
			element: <TasksApp />,
			children: [
				{
					path: ':id',
					element: <TaskForm />
				},
				{
					path: ':id/:type',
					element: <TaskForm />
				}
			]
		}
	]
};

export default TasksAppConfig;
