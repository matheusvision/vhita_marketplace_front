import clsx from 'clsx';
import { Box } from '@mui/system';
import { Palette } from '@mui/material/styles/createPalette';
import { PartialDeep } from 'type-fest';

type PalettePreviewProps = {
	className?: string;
	palette: PartialDeep<Palette>;
};

function PalettePreview(props: PalettePreviewProps) {
	const { palette, className } = props;

	return (
		<Box
			className={clsx('w-200 rounded-6 relative overflow-hidden text-left font-bold shadow', className)}
			sx={{
				backgroundColor: palette.background.default,
				color: palette.text.primary
			}}
			type="button"
			component="button"
		>
			<Box
				className="relative h-56 w-full px-8 pt-8"
				sx={{
					backgroundColor: palette.primary.main,
					color: () => palette.primary.contrastText || palette.getContrastText(palette.primary.main)
				}}
			>
				<span className="text-12">Header (Primary)</span>

				<Box
					className="text-10 absolute bottom-0 right-0 -mb-10 mr-4 flex h-20 w-20 items-center justify-center rounded-full shadow"
					sx={{
						backgroundColor: palette.secondary.main,
						color: () => palette.secondary.contrastText || palette.getContrastText(palette.secondary.main)
					}}
				>
					<span className="">S</span>
				</Box>
			</Box>
			<div className="-mt-24 w-full pl-8 pr-28">
				<Box
					className="rounded-4 relative h-96 w-full p-8 shadow"
					sx={{
						backgroundColor: palette.background.paper,
						color: palette.text.primary
					}}
				>
					<span className="text-12 opacity-75">Paper</span>
				</Box>
			</div>

			<div className="w-full p-8">
				<span className="text-12 opacity-75">Background</span>
			</div>

			{/* <pre className="language-js p-24 w-400">{JSON.stringify(palette, null, 2)}</pre> */}
		</Box>
	);
}

export default PalettePreview;
