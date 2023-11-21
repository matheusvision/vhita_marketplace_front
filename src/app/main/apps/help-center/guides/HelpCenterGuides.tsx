import { Outlet } from 'react-router-dom';
import { useGetGuideCategoriesQuery } from '../HelpCenterApi';

/**
 * The help center guides.
 */
function HelpCenterGuides() {
	useGetGuideCategoriesQuery();

	return <Outlet />;
}

export default HelpCenterGuides;
