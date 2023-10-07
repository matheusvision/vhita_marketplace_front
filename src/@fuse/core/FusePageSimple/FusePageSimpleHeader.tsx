import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the FusePageSimpleHeader component.
 */
type FusePageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The FusePageSimpleHeader component is a sub-component of the FusePageSimple layout component.
 * It provides a header area for the layout.
 * @param props - The props for the component.
 * @param props.className - Additional class name for the component.
 * @param props.header - The content to be displayed in the header.
 * @returns The rendered component.
 */
function FusePageSimpleHeader(props: FusePageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('FusePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default FusePageSimpleHeader;
