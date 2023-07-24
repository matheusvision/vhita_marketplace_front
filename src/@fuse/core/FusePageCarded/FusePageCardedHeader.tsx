import clsx from 'clsx';
import { ReactNode } from 'react';

function FusePageCardedHeader(props: { header?: ReactNode }) {
	const { header = null } = props;

	return <div className={clsx('FusePageCarded-header', 'container')}>{header}</div>;
}

export default FusePageCardedHeader;
