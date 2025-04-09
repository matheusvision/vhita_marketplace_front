import { motion } from 'motion/react';
import BudgetDetailsWidget from './widgets/BudgetDetailsWidget';

/**
 * The BudgetTab component.
 */
function BudgetTab() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0  px-24 md:px-32"
			variants={container}
			initial="hidden"
			animate="show"
		>

			<motion.div
				variants={item}
				className="sm:col-span-6"
			>
				<BudgetDetailsWidget />
			</motion.div>
		</motion.div>
	);
}

export default BudgetTab;
