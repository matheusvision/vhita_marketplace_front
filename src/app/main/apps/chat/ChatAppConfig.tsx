import lazyWithSlices from 'app/store/lazyWithSlices';
import Chat from './chat/Chat';
import ChatFirstScreen from './ChatFirstScreen';
import slices from './store';

const ChatApp = lazyWithSlices(() => import('./ChatApp'), slices);

const ChatAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/chat',
			element: <ChatApp />,
			children: [
				{
					path: '',
					element: <ChatFirstScreen />
				},
				{
					path: ':id',
					element: <Chat />
				}
			]
		}
	]
};

export default ChatAppConfig;
