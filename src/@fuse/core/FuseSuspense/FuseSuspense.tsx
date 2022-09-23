import FuseLoading from '@fuse/core/FuseLoading';
import { ReactNode, Suspense } from 'react';
import { FuseLoadingProps } from '@fuse/core/FuseLoading/FuseLoading';

interface Props {
	loadingProps: FuseLoadingProps;
	children: ReactNode;
}
/**
 * React Suspense defaults
 * For to Avoid Repetition
 */
function FuseSuspense(props: Props) {
	const { children, loadingProps = { delay: true } } = props;
	return <Suspense fallback={<FuseLoading {...loadingProps} />}>{children}</Suspense>;
}

export default FuseSuspense;
