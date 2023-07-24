import FuseLoading from '@fuse/core/FuseLoading';
import { ReactNode, Suspense } from 'react';
import { FuseLoadingProps } from '@fuse/core/FuseLoading/FuseLoading';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */
function FuseSuspense(props: { loadingProps?: FuseLoadingProps; children: ReactNode }) {
	const { children, loadingProps = { delay: true } } = props;
	return <Suspense fallback={<FuseLoading {...loadingProps} />}>{children}</Suspense>;
}

export default FuseSuspense;
