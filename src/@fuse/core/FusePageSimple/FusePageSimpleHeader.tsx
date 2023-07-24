import clsx from 'clsx';
import { ReactNode } from 'react';

function FusePageSimpleHeader(props: { className?: string; header?: ReactNode }) {
	const { header = null, className } = props;
	return (
		<div className={clsx('FusePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default FusePageSimpleHeader;
