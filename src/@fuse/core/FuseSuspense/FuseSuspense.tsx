import FuseLoading from '@fuse/core/FuseLoading';
import { ReactNode, Suspense } from 'react';
import { FuseLoadingProps } from '@fuse/core/FuseLoading/FuseLoading';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */

type Props = {
	loadingProps?: FuseLoadingProps;
	children: ReactNode;
};
function FuseSuspense(props: Props) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<FuseLoading {...loadingProps} />}>{children}</Suspense>;
}

export default FuseSuspense;
