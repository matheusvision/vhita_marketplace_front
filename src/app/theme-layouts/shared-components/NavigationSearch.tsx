import { useSelector } from 'react-redux';
import FuseSearch from '@fuse/core/FuseSearch';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';

type Props = {
	className?: string;
	variant?: 'basic' | 'full';
};

function NavigationSearch(props: Props) {
	const { variant, className } = props;

	const navigation = useSelector(selectFlatNavigation);

	return (
		<FuseSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

export default NavigationSearch;
