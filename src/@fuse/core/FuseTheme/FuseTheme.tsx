import { ThemeProvider } from '@mui/material/styles';
import { memo, ReactNode, useEffect, useLayoutEffect } from 'react';
import { Theme } from '@mui/material/styles/createTheme';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function FuseTheme(props: { children: ReactNode; direction: 'rtl' | 'ltr'; theme: Theme }) {
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
