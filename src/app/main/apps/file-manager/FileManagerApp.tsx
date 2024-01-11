import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import * as React from 'react';
import { useSelector } from 'react-redux';
import DetailSidebarContent from './DetailSidebarContent';
import FileManagerHeader from './FileManagerHeader';
import FileManagerList from './FileManagerList';
import { selectFiles, selectFolders, selectPath, useGetFileManagerFolderQuery } from './FileManagerApi';
import { selectSelectedItemId } from './store/selectedItemIdSlice';

/**
 * The file manager app.
 */
function FileManagerApp() {
	const routeParams = useParams();

	const { folderId } = routeParams;

	const selectedItem = useSelector(selectSelectedItemId);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const { isLoading } = useGetFileManagerFolderQuery(folderId);

	const folders = useSelector(selectFolders(folderId));
	const files = useSelector(selectFiles(folderId));
	const path = useSelector(selectPath(folderId));

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			header={
				<FileManagerHeader
					path={path}
					folders={folders}
					files={files}
				/>
			}
			content={
				<FileManagerList
					folders={folders}
					files={files}
				/>
			}
			rightSidebarOpen={Boolean(selectedItem)}
			rightSidebarContent={<DetailSidebarContent />}
			rightSidebarWidth={400}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default FileManagerApp;
