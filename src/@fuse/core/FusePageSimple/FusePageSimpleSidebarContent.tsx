import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ReactNode } from 'react';

function FusePageSimpleSidebarContent(props: { innerScroll?: boolean; children?: ReactNode }) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<FuseScrollbars enable={innerScroll}>
			<div className="FusePageSimple-sidebarContent">{children}</div>
		</FuseScrollbars>
	);
}

export default FusePageSimpleSidebarContent;
