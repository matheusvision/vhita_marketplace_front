import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
	header?: ReactNode;
}

function FusePageCardedHeader(props: Props) {
	const { header = null } = props;

	return <div className={clsx('FusePageCarded-header', 'container')}>{header}</div>;
}

export default FusePageCardedHeader;
