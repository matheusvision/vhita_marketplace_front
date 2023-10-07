import { Outlet } from 'react-router-dom';

/**
 * The tasks sidebar content.
 * @returns The jsx component.
 */
function TasksSidebarContent() {
	return (
		<div className="flex flex-col flex-auto">
			<Outlet />
		</div>
	);
}

export default TasksSidebarContent;
