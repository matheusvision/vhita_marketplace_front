import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ReactNode } from 'react';

function FusePageCardedSidebarContent(props: { innerScroll?: boolean; children?: ReactNode }) {
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
