import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import NotesSearch from './NotesSearch';
import { selectVariateDescSize, toggleVariateDescSize } from './notesAppSlice';

type NotesHeaderProps = {
	onSetSidebarOpen: (open: boolean) => void;
};

/**
 * The notes header.
 */
function NotesHeader(props: NotesHeaderProps) {
	const { onSetSidebarOpen } = props;

	const dispatch = useAppDispatch();
	const variateDescSize = useAppSelector(selectVariateDescSize);

	return (
		<div className="flex flex-col sm:flex-row flex-1 items-center justify-between py-8 sm:py-24 relative">
			<div className="flex shrink items-center sm:w-224 w-full">
				<Hidden lgUp>
					<IconButton
						onClick={() => onSetSidebarOpen(true)}
						aria-label="open left sidebar"
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:bars-3</FuseSvgIcon>
					</IconButton>
				</Hidden>

				<div className="flex items-center">
					<motion.span
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.2 } }}
					>
						<div>
							<PageBreadcrumb />

							<Typography className="text-20 md:text-24 font-extrabold tracking-tight leading-none">
								Notes
							</Typography>
						</div>
					</motion.span>
				</div>
			</div>

			<div className="flex flex-1 w-full sm:w-auto items-center justify-end space-x-12">
				<Tooltip title="Toggle Variate Description Size">
					<IconButton onClick={() => dispatch(toggleVariateDescSize())}>
						<FuseSvgIcon color={variateDescSize ? 'action' : 'disabled'}>
							heroicons-solid:arrows-up-down
						</FuseSvgIcon>
					</IconButton>
				</Tooltip>
				<NotesSearch />
			</div>
		</div>
	);
}

export default NotesHeader;
