import { amber } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FuseNavigationType, FuseNavItemType } from '@fuse/core/FuseNavigation';
import _ from '@lodash';
import FuseSvgIcon from '../FuseSvgIcon';

type FuseShortcutsProps = {
	className?: string;
	navigation: FuseNavigationType;
	onChange: (T) => void;
	shortcuts?: string[];
	variant?: 'horizontal' | 'vertical';
};

function FuseShortcuts(props: FuseShortcutsProps) {
	const { navigation = [], shortcuts = [], onChange, variant = 'horizontal', className = '' } = props;

	const searchInputRef = useRef<HTMLInputElement>(null);
	const [addMenu, setAddMenu] = useState<HTMLElement>(null);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<FuseNavigationType>(null);
	const shortcutItems = shortcuts ? shortcuts.map((id) => _.find(navigation, { id })) : [];

	function addMenuClick(event: React.MouseEvent<HTMLElement>) {
		setAddMenu(event.currentTarget);
	}

	function addMenuClose() {
		setAddMenu(null);
	}

	function search(ev: React.ChangeEvent<HTMLInputElement>) {
		const newSearchText = ev.target.value;

		setSearchText(newSearchText);

		if (newSearchText.length !== 0 && navigation) {
			setSearchResults(
				navigation.filter((item) => item.title.toLowerCase().includes(newSearchText.toLowerCase()))
			);
			return;
		}
		setSearchResults(null);
	}

	function toggleInShortcuts(id: string) {
		let newShortcuts = [...shortcuts];

		newShortcuts = _.xor(newShortcuts, id);

		onChange(newShortcuts);
	}

	return (
		<div className={clsx('flex flex-1', variant === 'vertical' && 'shrink grow-0 flex-col', className)}>
			{useMemo(() => {
				const container = {
					show: {
						transition: {
							staggerChildren: 0.1
						}
					}
				};
				const item = {
					hidden: { opacity: 0, scale: 0.6 },
					show: { opacity: 1, scale: 1 }
				};
				return (
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className={clsx('flex flex-1', variant === 'vertical' && 'flex-col')}
					>
						<>
							{shortcutItems.map(
								(_item) =>
									_item && (
										<Link
											to={_item.url}
											key={_item.id}
											role="button"
										>
											<Tooltip
												title={_item.title}
												placement={variant === 'horizontal' ? 'bottom' : 'left'}
											>
												<IconButton
													className="h-40 w-40 p-0"
													component={motion.div}
													variants={item}
													size="large"
												>
													{_item.icon ? (
														<FuseSvgIcon>{_item.icon}</FuseSvgIcon>
													) : (
														<span className="text-20 font-semibold uppercase">
															{_item.title[0]}
														</span>
													)}
												</IconButton>
											</Tooltip>
										</Link>
									)
							)}

							<Tooltip
								title="Click to add/remove shortcut"
								placement={variant === 'horizontal' ? 'bottom' : 'left'}
							>
								<IconButton
									component={motion.div}
									variants={item}
									className="h-40 w-40 p-0"
									aria-owns={addMenu ? 'add-menu' : null}
									aria-haspopup="true"
									onClick={addMenuClick}
									size="large"
								>
									<FuseSvgIcon sx={{ color: amber[600] }}>heroicons-solid:star</FuseSvgIcon>
								</IconButton>
							</Tooltip>
						</>
					</motion.div>
				);
			}, [addMenu, variant, shortcutItems])}

			<Menu
				id="add-menu"
				anchorEl={addMenu}
				open={Boolean(addMenu)}
				onClose={addMenuClose}
				classes={{
					paper: 'min-w-256'
				}}
				TransitionProps={{
					onEntered: () => {
						searchInputRef.current.focus();
					},
					onExited: () => {
						setSearchText('');
					}
				}}
			>
				<div className="p-16 pt-8">
					<Input
						inputRef={searchInputRef}
						value={searchText}
						onChange={search}
						placeholder="Search for an app or page"
						className=""
						fullWidth
						inputProps={{
							'aria-label': 'Search'
						}}
						disableUnderline
					/>
				</div>

				<Divider />

				{searchText.length !== 0 &&
					searchResults &&
					searchResults.map((_item) => (
						<ShortcutMenuItem
							shortcuts={shortcuts}
							key={_item.id}
							item={_item}
							onToggle={() => toggleInShortcuts(_item.id)}
						/>
					))}

				{searchText.length !== 0 && searchResults.length === 0 && (
					<Typography
						color="text.secondary"
						className="p-16 pb-8"
					>
						No results..
					</Typography>
				)}

				{searchText.length === 0 &&
					shortcutItems.map(
						(_item) =>
							_item && (
								<ShortcutMenuItem
									shortcuts={shortcuts}
									key={_item.id}
									item={_item}
									onToggle={() => toggleInShortcuts(_item.id)}
								/>
							)
					)}
			</Menu>
		</div>
	);
}

function ShortcutMenuItem(props: {
	shortcuts: FuseShortcutsProps['shortcuts'];
	item: FuseNavItemType;
	onToggle: (T: string) => void;
}) {
	const { item, onToggle, shortcuts } = props;

	if (!item || !item.id) {
		return null;
	}

	return (
		<Link
			to={item.url || ''}
			role="button"
		>
			<MenuItem key={item.id}>
				<ListItemIcon className="min-w-40">
					{item.icon ? (
						<FuseSvgIcon>{item.icon}</FuseSvgIcon>
					) : (
						<span className="text-20 text-center font-semibold uppercase">{item.title[0]}</span>
					)}
				</ListItemIcon>
				<ListItemText primary={item.title} />
				<IconButton
					onClick={(ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						onToggle(item.id);
					}}
					size="large"
				>
					<FuseSvgIcon color="action">
						{shortcuts.includes(item.id) ? 'heroicons-solid:star' : 'heroicons-outline:star'}
					</FuseSvgIcon>
				</IconButton>
			</MenuItem>
		</Link>
	);
}

export default memo(FuseShortcuts);
