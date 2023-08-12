import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ReactNode } from 'react';

type FusePageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

function FusePageSimpleSidebarContent(props: FusePageSimpleSidebarContentProps) {
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
