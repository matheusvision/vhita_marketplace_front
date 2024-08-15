import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';

/**
 * The orders header.
 */
function OrdersHeader() {
	return (
		<div className="flex grow-0 space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16">
			<motion.span
				initial={{ x: -20 }}
				animate={{
					x: 0,
					transition: { delay: 0.2 }
				}}
			>
				<div>
					<PageBreadcrumb />
					<Typography className="flex text-20 md:text-24 font-extrabold tracking-tight">Orders</Typography>
				</div>
			</motion.span>

			<div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8" />
		</div>
	);
}

export default OrdersHeader;
