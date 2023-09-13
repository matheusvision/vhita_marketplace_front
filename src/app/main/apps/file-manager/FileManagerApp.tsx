import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/index';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useParams } from 'react-router-dom';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DetailSidebarContent from './DetailSidebarContent';
import reducer from './store';
import { getItems, selectSelectedItemId } from './store/itemsSlice';
import FileManagerHeader from './FileManagerHeader';
import FileManagerList from './FileManagerList';

function FileManagerApp() {
	const dispatch = useAppDispatch();
	const selectedItem = useAppSelector(selectSelectedItemId);
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		dispatch(getItems(routeParams.folderId));
	}, [dispatch, routeParams.folderId]);

	return (
		<FusePageCarded
			header={<FileManagerHeader />}
			content={<FileManagerList />}
			rightSidebarOpen={Boolean(selectedItem)}
			rightSidebarContent={<DetailSidebarContent />}
			rightSidebarWidth={400}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
