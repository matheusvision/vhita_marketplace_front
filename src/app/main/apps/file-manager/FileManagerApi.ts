import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import _ from '@lodash';
import { selectSelectedItemId } from './store/selectedItemIdSlice';

export const addTagTypes = ['file_manager_folder'] as const;

const FileManagerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFileManagerFolder: build.query<GetFileManagerFolderApiResponse, GetFileManagerFolderApiArg>({
				query: (folderId) => ({ url: `/mock-api/file-manager/${folderId}` }),
				providesTags: ['file_manager_folder']
			}),
			updateFileManagerFolder: build.mutation<UpdateFileManagerFolderApiResponse, UpdateFileManagerFolderApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/file-manager/${queryArg.folderId}`,
					method: 'PUT',
					body: queryArg.fileManagerItem
				}),
				invalidatesTags: ['file_manager_folder']
			}),
			deleteFileManagerFolder: build.mutation<DeleteFileManagerFolderApiResponse, DeleteFileManagerFolderApiArg>({
				query: (folderId) => ({
					url: `/mock-api/file-manager/${folderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['file_manager_folder']
			})
		}),
		overrideExisting: false
	});
export default FileManagerApi;

export type GetFileManagerFolderApiResponse = {
	items: FileManagerItem[];
	path: FileManagerPath[];
};
export type GetFileManagerFolderApiArg = string; // folderId

export type UpdateFileManagerFolderApiResponse = unknown;
export type UpdateFileManagerFolderApiArg = {
	/** folder id */
	folderId: string;
	fileManagerItem: FileManagerItem;
};

export type DeleteFileManagerFolderApiResponse = unknown;
export type DeleteFileManagerFolderApiArg = string; // folderId;

export type FileManagerPath = {
	name: string;
	id: string;
};

export type FileManagerItem = {
	id: string;
	folderId?: string;
	name: string;
	createdBy: string;
	createdAt: string;
	modifiedAt: string;
	size: string;
	type: string;
	contents: string;
	description: string;
};

export const { useGetFileManagerFolderQuery, useUpdateFileManagerFolderMutation, useDeleteFileManagerFolderMutation } =
	FileManagerApi;

export type FileManagerApiType = {
	[FileManagerApi.reducerPath]: ReturnType<typeof FileManagerApi.reducer>;
};

export const selectPath = (folderId: string) => (state: FileManagerApiType) =>
	FileManagerApi.endpoints.getFileManagerFolder.select(folderId)(state)?.data?.path || ([] as FileManagerPath[]);

export const selectFolderItems = (folderId: string) => (state: FileManagerApiType) =>
	FileManagerApi.endpoints.getFileManagerFolder.select(folderId)(state)?.data?.items || ([] as FileManagerItem[]);

export const selectFolders = (folderId: string) =>
	createSelector([selectFolderItems(folderId)], (items) => {
		return _.filter(items, { type: 'folder' });
	});

export const selectFiles = (folderId: string) =>
	createSelector([selectFolderItems(folderId)], (items) => {
		return _.reject(items, { type: 'folder' });
	});

export const selectSelectedItem = (folderId: string) =>
	createSelector([selectFolderItems(folderId), selectSelectedItemId], (items, selectedItemId) => {
		return _.find(items, { id: selectedItemId });
	});
