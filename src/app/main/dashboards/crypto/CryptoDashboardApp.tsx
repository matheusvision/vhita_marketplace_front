import { useEffect, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/store';
import { getWidgets } from './store/widgetsSlice';
import CryptoDashboardAppHeader from './CryptoDashboardAppHeader';
import CryptoDashboardAppSidebar from './CryptoDashboardAppSidebar';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';
import CryptoDashboardAppContent from './CryptoDashboardAppContent';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-toolbar': {},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {
		backgroundColor: theme.palette.background.default
	}
}));

/**
 * The CryptoDashboardApp page.
 */
function CryptoDashboardApp() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	return (
		<Root
			header={<CryptoDashboardAppHeader onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)} />}
			leftSidebarContent={<CryptoDashboardAppSidebar />}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			leftSidebarWidth={320}
			content={<CryptoDashboardAppContent />}
		/>
	);
}

export default CryptoDashboardApp;
