import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ReactNode } from 'react';

interface Props {
	innerScroll?: boolean;
	children?: ReactNode;
}

function FusePageCardedSidebarContent(props: Props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<FuseScrollbars enable={innerScroll}>
			<div className="FusePageCarded-sidebarContent">{children}</div>
		</FuseScrollbars>
	);
}

export default FusePageCardedSidebarContent;
