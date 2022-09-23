import { styled } from '@mui/material/styles';
import MobileDetect from 'mobile-detect';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { createRef, forwardRef, useCallback, useEffect, useRef, ReactNode, ForwardedRef } from 'react';
import { connect } from 'react-redux';
import history from '@history';
import { RootState } from 'app/store/index';

const Root = styled('div')(() => ({
	overscrollBehavior: 'contain',
	minHeight: '100%'
}));

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const handlerNameByEvent = {
	'ps-scroll-y': 'onScrollY',
	'ps-scroll-x': 'onScrollX',
	'ps-scroll-up': 'onScrollUp',
	'ps-scroll-down': 'onScrollDown',
	'ps-scroll-left': 'onScrollLeft',
	'ps-scroll-right': 'onScrollRight',
	'ps-y-reach-start': 'onYReachStart',
	'ps-y-reach-end': 'onYReachEnd',
	'ps-x-reach-start': 'onXReachStart',
	'ps-x-reach-end': 'onXReachEnd'
};
Object.freeze(handlerNameByEvent);

interface Props {
	id?: string;
	className?: string;
	enable?: boolean;
	customScrollbars?: boolean;
	option?: {
		wheelPropagation: boolean;
	};
	scrollToTopOnChildChange?: () => void;
	scrollToTopOnRouteChange?: () => void;
	children?: ReactNode;
}

const FuseScrollbars = forwardRef<ForwardedRef<HTMLElement>, Props>((props, ref) => {
	const { customScrollbars, scrollToTopOnChildChange, scrollToTopOnRouteChange, id, enable = true, children } = props;

	let elRef;

	if (!ref) {
		elRef = createRef();
	} else {
		elRef = ref;
	}

	const ps = useRef(null);
	const handlerByEvent = useRef(new Map());

	const hookUpEvents = useCallback(() => {
		Object.keys(handlerNameByEvent).forEach((key) => {
			const callback = props[handlerNameByEvent[key]];
			if (callback) {
				const handler = () => callback(elRef.current);
				handlerByEvent.current.set(key, handler);
				elRef.current.addEventListener(key, handler, false);
			}
		});
		// eslint-disable-next-line
	}, [ref]);

	const unHookUpEvents = useCallback(() => {
		handlerByEvent.current.forEach((value, key) => {
			if (elRef.current) {
				elRef.current.removeEventListener(key, value, false);
			}
		});
		handlerByEvent.current.clear();
	}, [ref]);

	const destroyPs = useCallback(() => {
		// console.info("destroy::ps");

		unHookUpEvents();

		if (!ps.current) {
			return;
		}
		ps.current.destroy();
		ps.current = null;
	}, [unHookUpEvents]);

	const createPs = useCallback(() => {
		// console.info("create::ps");

		if (isMobile || !ref || ps.current) {
			return;
		}

		ps.current = new PerfectScrollbar(elRef.current, props.option);

		hookUpEvents();
	}, [hookUpEvents, props.option, ref]);

	useEffect(() => {
		function updatePs() {
			if (!ps.current) {
				return;
			}
			ps.current.update();
		}

		updatePs();
	});

	useEffect(() => {
		if (customScrollbars) {
			createPs();
		} else {
			destroyPs();
		}
	}, [createPs, customScrollbars, destroyPs]);

	const scrollToTop = useCallback(() => {
		if (ref && elRef.current) {
			elRef.current.scrollTop = 0;
		}
	}, [ref]);

	useEffect(() => {
		if (scrollToTopOnChildChange) {
			scrollToTop();
		}
	}, [scrollToTop, children, props.scrollToTopOnChildChange]);

	useEffect(
		() =>
			history.listen(() => {
				if (scrollToTopOnRouteChange) {
					scrollToTop();
				}
			}),
		[scrollToTop, scrollToTopOnRouteChange]
	);

	useEffect(
		() => () => {
			destroyPs();
		},
		[destroyPs]
	);
	let style = {};

	if (props.customScrollbars && enable && !isMobile) {
		style = {
			position: 'relative',
			overflow: 'hidden!important'
		};
	}

	// console.info('render::ps');
	return (
		<Root id={id} className={props.className} style={style} ref={elRef}>
			{children}
		</Root>
	);
});

function mapStateToProps({ fuse }: RootState) {
	return {
		customScrollbars: fuse.settings.current.customScrollbars
	};
}
// export default connect(mapStateToProps, null, null, { forwardRef: true })(withRouterAndRef(FuseScrollbars));
export default connect(mapStateToProps, null, null, { forwardRef: true })(FuseScrollbars);
