import FuseSearch from '@fuse/core/FuseSearch';
import withSlices from 'src/store/withSlices';
import { navigationSlice } from './store/navigationSlice';
import useNavigation from './hooks/useNavigation';

type NavigationSearchProps = {
	className?: string;
	variant?: 'basic' | 'full';
};

/**
 * The navigation search.
 */
function NavigationSearch(props: NavigationSearchProps) {
	const { variant, className } = props;
	const { flattenNavigation: navigation } = useNavigation();

	return (
		<FuseSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

const NavigationSearchWithSlices = withSlices<NavigationSearchProps>([navigationSlice])(NavigationSearch);

export default NavigationSearchWithSlices;
