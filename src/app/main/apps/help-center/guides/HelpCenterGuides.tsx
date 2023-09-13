import { useAppDispatch } from 'app/store/index';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getGuideCategories } from '../store/guideCategoriesSlice';

function HelpCenterGuides() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getGuideCategories());
	}, [dispatch]);

	return <Outlet />;
}

export default HelpCenterGuides;
