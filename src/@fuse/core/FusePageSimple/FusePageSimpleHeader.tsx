import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
	className?: string;
	header?: ReactNode;
}
function FusePageSimpleHeader(props: Props) {
	const { header = null, className } = props;
	return (
		<div className={clsx('FusePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default FusePageSimpleHeader;
