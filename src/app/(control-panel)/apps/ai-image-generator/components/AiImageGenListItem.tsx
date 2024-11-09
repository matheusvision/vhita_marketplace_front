import { Paper, ButtonGroup } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	AiImageGenItem,
	useDeleteAiImageGenItemMutation,
	useUpdateAiImageGenItemMutation
} from '@/app/(control-panel)/apps/ai-image-generator/AiImageGenApi';
import useAiImageGenAppContext from '../contexts/useAiImageGenAppContext';

type AiImageGenListItemProps = {
	className?: string;
	item: AiImageGenItem;
};

function AiImageGenListItem(props: AiImageGenListItemProps) {
	const { item, className = '' } = props;
	const { setSelectedItem, selectedItem } = useAiImageGenAppContext();

	const [remove] = useDeleteAiImageGenItemMutation();
	const [update] = useUpdateAiImageGenItemMutation();

	function handleInfo() {
		setSelectedItem(item);
	}

	function handleRemove() {
		console.info('remove', item.id);
		remove(item.id);
	}

	function handleDownload() {
		const downloadLink = document.createElement('a');
		downloadLink.href = item.response?.data[0]?.url;
		downloadLink.download = `${item.formData?.prompt?.slice(0, 30)}.png`;
		downloadLink.click();
		downloadLink.remove();
	}

	function handleToggleFavorite() {
		update({ ...item, favorite: !item.favorite });
	}

	return (
		<Paper className={clsx('relative group', className)}>
			{item.favorite && (
				<FuseSvgIcon className="absolute top-8 right-8 text-red-500">heroicons-solid:heart</FuseSvgIcon>
			)}
			<img
				src={item.response?.data[0]?.url}
				alt={item.formData?.prompt}
				className="w-full h-auto rounded-lg"
			/>
			<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
				<ButtonGroup
					variant="contained"
					sx={{
						backgroundColor: (theme) => theme.palette.background.paper,
						color: (theme) => theme.palette.text.primary
					}}
				>
					<IconButton onClick={handleInfo}>
						<FuseSvgIcon>heroicons-solid:information-circle</FuseSvgIcon>
					</IconButton>
					<IconButton onClick={handleDownload}>
						<FuseSvgIcon>heroicons-solid:cloud-arrow-down</FuseSvgIcon>
					</IconButton>
					<IconButton onClick={handleToggleFavorite}>
						<FuseSvgIcon>{item.favorite ? 'heroicons-solid:heart' : 'heroicons-outline:heart'}</FuseSvgIcon>
					</IconButton>
					<IconButton onClick={handleRemove}>
						<FuseSvgIcon>heroicons-solid:trash</FuseSvgIcon>
					</IconButton>
				</ButtonGroup>
			</div>
			<Typography className="mt-8 text-sm truncate">{item.formData?.prompt}</Typography>
		</Paper>
	);
}

export default AiImageGenListItem;
