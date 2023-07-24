import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';

function useThemeMediaQuery(themeCallbackFunc: (theme: ThemeOptions) => void) {
	const theme = useTheme();

	const query = themeCallbackFunc(theme).replace('@media ', '');

	const [matches, setMatches] = useState(getMatches(query));

	function getMatches(q: string) {
		return window.matchMedia(q).matches;
	}

	useEffect(
		() => {
			const mediaQuery = window.matchMedia(query);
			// Update the state with the current value
			setMatches(getMatches(query));
			// Create an event listener
			const handler = (event) => setMatches(event.matches);
			// Attach the event listener to know when the matches value changes
			mediaQuery.addEventListener('change', handler);
			// Remove the event listener on cleanup
			return () => mediaQuery.removeEventListener('change', handler);
		},
		[query] // Empty array ensures effect is only run on mount and unmount
	);

	return matches;
}

export default useThemeMediaQuery;
