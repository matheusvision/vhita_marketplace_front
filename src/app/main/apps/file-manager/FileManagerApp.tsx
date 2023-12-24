import { useAppSelector } from 'app/store';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import * as React from 'react';
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

	const selectedItem = useAppSelector(selectSelectedItemId);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const { isLoading } = useGetFileManagerFolderQuery(folderId);

	const folders = useAppSelector(selectFolders(folderId));
	const files = useAppSelector(selectFiles(folderId));
	const path = useAppSelector(selectPath(folderId));

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
