import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { getMembers } from './store/membersSlice';
import reducer from './store';

function ScrumboardApp() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMembers());
	}, [dispatch]);

	return <Outlet />;
}

export default withReducer('scrumboardApp', reducer)(ScrumboardApp);
