import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/store';
import { getMembers } from './store/membersSlice';

/**
 * The scrumboard app.
 * @returns The jsx component.
 */
function ScrumboardApp() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMembers());
	}, [dispatch]);

	return <Outlet />;
}

export default ScrumboardApp;
