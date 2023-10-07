import Paper from '@mui/material/Paper';
import { useAppSelector } from 'app/store';
import WatchlistItem from './widgets/WatchlistItem';
import { selectWidgets } from './store/widgetsSlice';
import BuySellForm from './widgets/BuySellForm';

/**
 * The crypto dashboard app sidebar.
 *
 * @returns {JSX.Element} The crypto dashboard app sidebar.
 */
function CryptoDashboardAppSidebar() {
	const widgets = useAppSelector(selectWidgets);

	const { watchlist } = widgets || {};

	return (
		<>
			<Paper
				elevation={0}
				square
			>
				{watchlist?.map((item) => (
					<WatchlistItem
						key={item.iso}
						item={item}
					/>
				))}
			</Paper>
			<BuySellForm />
		</>
	);
}

export default CryptoDashboardAppSidebar;
