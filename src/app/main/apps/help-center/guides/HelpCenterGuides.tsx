import { Outlet } from 'react-router-dom';
import { useGetHelpCenterGuideCategoriesQuery } from '../HelpCenterApi';

/**
 * The help center guides.
 */
function HelpCenterGuides() {
	useGetHelpCenterGuideCategoriesQuery();

	return <Outlet />;
}

export default HelpCenterGuides;
