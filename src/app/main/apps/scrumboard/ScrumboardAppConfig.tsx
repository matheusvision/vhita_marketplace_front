import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import DynamicSliceProvider from 'app/store/DynamicSliceProvider';
import ScrumboardApp from './ScrumboardApp';
import slices from './store';

const Board = lazy(() => import('./board/Board'));
const Boards = lazy(() => import('./boards/Boards'));

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/scrumboard',
			element: (
				<DynamicSliceProvider slices={slices}>
					<ScrumboardApp />
				</DynamicSliceProvider>
			),
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
