import { ThemeProvider } from '@mui/material/styles';
import { memo, ReactNode, useEffect, useLayoutEffect } from 'react';
import { Theme } from '@mui/material/styles/createTheme';

/**
 * The useEnhancedEffect function is used to conditionally use the useLayoutEffect hook if the window object is defined.
 * Otherwise, it uses the useEffect hook.
 */
const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type FuseThemeProps = {
	children: ReactNode;
	direction: 'rtl' | 'ltr';
	theme: Theme;
};

/**
 * The FuseTheme component is responsible for rendering the MUI ThemeProvider component with the specified theme and direction.
 * It also sets the direction of the document body and adds a class to the body based on the current theme mode.
 * The component is memoized to prevent unnecessary re-renders.
 */
function FuseTheme(props: FuseThemeProps) {
	const { direction, theme, children } = props;
	const { mode } = theme.palette;

	useEnhancedEffect(() => {
		document.body.dir = direction;
	}, [direction]);

	useEffect(() => {
		document.body.classList.add(mode === 'light' ? 'light' : 'dark');
		document.body.classList.remove(mode === 'light' ? 'dark' : 'light');
	}, [mode]);

	// console.warn('FuseTheme:: rendered',mainTheme);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default memo(FuseTheme);
