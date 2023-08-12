import clsx from 'clsx';
import { ReactNode } from 'react';

type FusePageCardedHeaderProps = {
	header?: ReactNode;
};
function FusePageCardedHeader(props: FusePageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('FusePageCarded-header', 'container')}>{header}</div>;
}

export default FusePageCardedHeader;
