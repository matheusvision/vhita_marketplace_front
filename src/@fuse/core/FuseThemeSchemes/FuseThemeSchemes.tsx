import { memo } from 'react';
import { FuseThemesType, FuseThemeType } from '@fuse/core/FuseSettings/FuseSettings';
import SchemePreview from './SchemePreview';

type FuseThemeSchemesProps = {
	themes: FuseThemesType;
	onSelect?: (t: FuseThemeType) => void;
};

function FuseThemeSchemes(props: FuseThemeSchemesProps) {
	const { themes, onSelect = () => {} } = props;

	return (
		<div>
			<div className="flex flex-wrap w-full -mx-8">
				{Object.entries(themes)
					.filter(([key]) => !(key === 'mainThemeDark' || key === 'mainThemeLight'))
					.map(([key, val]) => (
						<div
							key={key}
							className="w-1/2 p-8"
						>
							<SchemePreview
								id={key}
								theme={val}
								onSelect={() => onSelect(val)}
							/>
						</div>
					))}
			</div>
		</div>
	);
}

export default memo(FuseThemeSchemes);
