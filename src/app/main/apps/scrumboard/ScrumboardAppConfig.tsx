import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import lazyWithSlices from 'app/store/lazyWithSlices';
import slices from './store';

const ScrumboardApp = lazyWithSlices(() => import('./ScrumboardApp'), slices);
const Board = lazy(() => import('./board/Board'));
const Boards = lazy(() => import('./boards/Boards'));

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/scrumboard',
			element: <ScrumboardApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/apps/scrumboard/boards" />
				},
				{
					path: 'boards',
					element: <Boards />
				},
				{
					path: 'boards/:boardId',
					element: <Board />
				}
			]
		}
	]
};

export default ScrumboardAppConfig;
