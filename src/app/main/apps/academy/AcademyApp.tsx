import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import withReducer from 'app/store/withReducer';
import { useAppDispatch } from 'app/store/index';
import { getCategories } from './store/categoriesSlice';
import reducer from './store';

function AcademyApp() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return <Outlet />;
}

export default withReducer('academyApp', reducer)(AcademyApp);
