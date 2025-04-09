import { motion } from 'motion/react';

type VhitaFiltersProps = {
	children: React.ReactNode;
};

const VhitaFilters = ({ children }: VhitaFiltersProps) => {
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
			className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 px-24 md:px-32"
			variants={container}
			initial="hidden"
			animate="show"
		>

			<motion.div
				variants={item}
				className="bg-gray-100 p-16 pt-24 pb-24 sm:col-span-6 rounded-xl"
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default VhitaFilters;
