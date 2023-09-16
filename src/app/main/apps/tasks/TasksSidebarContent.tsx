import { Outlet } from 'react-router-dom';

function TasksSidebarContent() {
	return (
		<div className="flex flex-col flex-auto">
			<Outlet />
		</div>
	);
}

export default TasksSidebarContent;
