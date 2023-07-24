import { memo } from 'react';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import SchemePreview from './SchemePreview';

function FuseThemeSchemes(props: { themes: { [key: string]: ThemeOptions }; onSelect?: (ThemeOptions) => void }) {
	const { themes, onSelect = () => {} } = props;

	return (
		<div>
			<div className="flex flex-wrap w-full -mx-8">
				{Object.entries(themes)
					.filter(([key]) => !(key === 'mainThemeDark' || key === 'mainThemeLight'))
					.map(([key, val]) => (
						<div key={key} className="w-1/2 p-8">
							<SchemePreview id={key} theme={val} onSelect={() => onSelect(val)} />
						</div>
					))}
			</div>
		</div>
	);
}

export default memo(FuseThemeSchemes);
