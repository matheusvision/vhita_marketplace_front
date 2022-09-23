import * as React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import FramedDemo from './FramedDemo';
import { useRef } from 'react';

interface Props {
	name: string;
	children: React.ReactElement;
	other?: React.HTMLAttributes<HTMLElement>;
}

const Frame = styled('iframe')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	flexGrow: 1,
	height: 400,
	border: 0,
	boxShadow: theme.shadows[1]
}));

function DemoFrame(props: Props) {
	const { children, name, ...other } = props;
	const title = `${name} demo`;
	/**
	 * @type {import('react').Ref<HTMLIFrameElement>}
	 */
	const frameRef = React.useRef(null);

	// If we load portal content into the iframe before the load event then that content
	// is dropped in firefox.
	const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

	React.useEffect(() => {
		const document = frameRef.current.contentDocument;
		// When we hydrate the iframe then the load event is already dispatched
		// once the iframe markup is parsed (maybe later but the important part is
		// that it happens before React can attach event listeners).
		// We need to check the readyState of the document once the iframe is mounted
		// and "replay" the missed load event.
		// See https://github.com/facebook/react/pull/13862 for ongoing effort in React
		// (though not with iframes in mind).
		if (document != null && document.readyState === 'complete' && !iframeLoaded) {
			onLoad();
		}
	}, [iframeLoaded]);
	const document: Document = frameRef.current?.contentDocument;
	return (
		<>
			<Frame onLoad={onLoad} ref={frameRef} title={title} {...other} />
			{iframeLoaded !== false
				? ReactDOM.createPortal(<FramedDemo document={document}>{children}</FramedDemo>, document.body)
				: null}
		</>
	);
}

export default React.memo(DemoFrame);
