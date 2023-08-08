import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface FullScreenDocument extends Document {
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	webkitFullscreenElement?: Element;
	mozCancelFullScreen?: () => void;
	msExitFullscreen?: () => void;
	webkitExitFullscreen?: () => void;
}

interface FullScreenHTMLElement extends HTMLElement {
	mozRequestFullScreen?: () => void;
	webkitRequestFullscreen?: () => void;
	msRequestFullscreen?: () => void;
}

type Props = {
	className?: string;
};

function HeaderFullScreenToggle(props: Props) {
	const { className = '' } = props;

	const [isFullScreen, setIsFullScreen] = useState(false);

	useEnhancedEffect(() => {
		document.onfullscreenchange = () => setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);

		return () => {
			document.onfullscreenchange = undefined;
		};
	});

	function getBrowserFullscreenElementProp() {
		const doc: FullScreenDocument = document;

		if (typeof doc.fullscreenElement !== 'undefined') {
			return 'fullscreenElement';
		}
		if (typeof doc.mozFullScreenElement !== 'undefined') {
			return 'mozFullScreenElement';
		}
		if (typeof doc.msFullscreenElement !== 'undefined') {
			return 'msFullscreenElement';
		}
		if (typeof doc.webkitFullscreenElement !== 'undefined') {
			return 'webkitFullscreenElement';
		}
		throw new Error('fullscreenElement is not supported by this browser');
	}

	/* View in fullscreen */
	function openFullscreen() {
		const elem: FullScreenHTMLElement = document.documentElement;

		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	}

	/* Close fullscreen */
	function closeFullscreen() {
		const doc: FullScreenDocument = document;

		if (doc.exitFullscreen) {
			doc.exitFullscreen();
		} else if (doc.mozCancelFullScreen) {
			/* Firefox */
			doc.mozCancelFullScreen();
		} else if (doc.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			doc.webkitExitFullscreen();
		} else if (doc.msExitFullscreen) {
			/* IE/Edge */
			doc.msExitFullscreen();
		}
	}

	function toggleFullScreen() {
		const doc: FullScreenDocument = document;

		if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement) {
			closeFullscreen();
		} else {
			openFullscreen();
		}
	}

	return (
		<Tooltip
			title="Fullscreen toggle"
			placement="bottom"
		>
			<IconButton
				onClick={toggleFullScreen}
				className={clsx('w-40 h-40', className, isFullScreen && 'text-red-500')}
				size="large"
			>
				<FuseSvgIcon>heroicons-outline:arrows-expand</FuseSvgIcon>
			</IconButton>
		</Tooltip>
	);
}

export default HeaderFullScreenToggle;
