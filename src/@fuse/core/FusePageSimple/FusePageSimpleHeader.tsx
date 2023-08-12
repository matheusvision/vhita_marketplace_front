import clsx from 'clsx';
import { ReactNode } from 'react';

type FusePageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

function FusePageSimpleHeader(props: FusePageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('FusePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default FusePageSimpleHeader;
