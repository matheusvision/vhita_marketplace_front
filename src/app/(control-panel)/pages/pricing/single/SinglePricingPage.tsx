import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { motion } from 'motion/react';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import SinglePricingFeatureItem from './SinglePricingFeatureItem';
import SinglePricingCard from './SinglePricingCard';

/**
 * The single pricing page.
 */
function SinglePricingPage() {
	return (
		<div className="relative flex min-w-0 flex-auto flex-col overflow-hidden">
			<div className="relative overflow-hidden px-24 pb-48 pt-32 sm:px-64 sm:pb-96 sm:pt-80">
				<svg
					className="pointer-events-none absolute inset-0 -z-1"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: 'divider' }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle
							r="234"
							cx="196"
							cy="23"
						/>
						<circle
							r="234"
							cx="790"
							cy="491"
						/>
					</Box>
				</svg>
				<div className="flex flex-col items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.05 } }}
					>
						<PageBreadcrumb />
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
					>
						<div className="mt-4 text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
							Take control of your productivity
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.15 } }}
					>
						<Typography
							className="mt-12 text-center tracking-tight sm:text-2xl"
							color="text.secondary"
						>
							Start small and free, upgrade as you go.
							<br />
							Take control of everything.
						</Typography>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
						className="mt-40 flex justify-center sm:mt-80"
					>
						<SinglePricingCard />
					</motion.div>
				</div>
			</div>

			<Paper className="flex flex-col items-center px-24 py-40 sm:px-64 sm:pb-80 sm:pt-72">
				<div className="container">
					<div>
						<Typography className="text-4xl font-extrabold leading-tight tracking-tight">
							Everything you need to build efficiently
						</Typography>
						<Typography
							className="mt-2 max-w-xl text-xl"
							color="text.secondary"
						>
							Start building your app using our tools, be efficient, spend less time with details more
							time with your business
						</Typography>
					</div>
					<div className="mt-48 grid w-full grid-cols-1 gap-x-24 gap-y-48 sm:mt-64 sm:grid-cols-2 lg:grid-cols-3 lg:gap-64">
						<SinglePricingFeatureItem
							icon="heroicons-outline:pencil-square"
							title="Create and Edit Projects"
							subtitle="Create and edit projects, upload images via drag drop, add categories, add custom
                fields, create interactive forms and more."
						/>
						<SinglePricingFeatureItem
							icon="heroicons-outline:funnel"
							title="Search and Filter"
							subtitle="Search and filter within the projects, categories and custom fields. Save search and
                filter details for easy access."
						/>
						<SinglePricingFeatureItem
							icon="heroicons-outline:arrow-path"
							title="Real Time Updates"
							subtitle="Real time updates that doesn't require page reload. Lean back and watch the changes
                happen in real time."
						/>
						<SinglePricingFeatureItem
							icon="heroicons-outline:tag"
							title="Meta Information"
							subtitle="Add and remove meta information to custom fields to differentiate them in reports and analytics results, use them for detailed reports."
						/>
						<SinglePricingFeatureItem
							icon="heroicons-outline:document-text"
							title="Pre-rendered Results"
							subtitle="Pre-render results to make reports and analytics more accessible by screen readers
                and other accessibility tools."
						/>
						<SinglePricingFeatureItem
							icon="heroicons-outline:chart-bar-square"
							title="Simple Analytics"
							subtitle="Simple analytics with no unnecessary data flow or weight. More readable results with
                less data consumption."
						/>
					</div>
				</div>
			</Paper>
			<Box
				sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
				className="px-24 py-40 sm:px-64 sm:py-48"
			>
				<div className="mx-auto flex container flex-col items-center text-center">
					<Typography className="text-3xl font-extrabold leading-6 sm:text-5xl sm:leading-10">
						Boost your productivity.
					</Typography>
					<Typography
						className="mt-8 text-3xl font-extrabold leading-6 sm:text-5xl sm:leading-10 opacity-75"
						color="primary.dark"
					>
						Start using Fuse today.
					</Typography>
					<Button
						className="mt-32 px-48 text-lg"
						size="large"
						color="secondary"
						variant="contained"
					>
						Sign up for free
					</Button>
				</div>
			</Box>

			<div className="flex flex-col items-center px-24 pb-32 pt-12 sm:px-64 sm:pb-80 sm:pt-72">
				<div className="container">
					<div>
						<Typography className="text-4xl font-extrabold leading-tight tracking-tight">
							Frequently asked questions
						</Typography>
						<Typography
							className="mt-8 max-w-xl text-xl"
							color="text.secondary"
						>
							Here are the most frequently asked questions you may check before getting started
						</Typography>
					</div>
					<div className="mt-48 grid w-full grid-cols-1 gap-x-24 gap-y-48 sm:mt-64 sm:grid-cols-2 lg:gap-x-64">
						<div>
							<Typography className="text-xl font-semibold">
								What is the duration of the free trial?
							</Typography>
							<Typography
								className="mt-8 leading-6"
								color="text.secondary"
							>
								Our app is free to try for 14 days, if you want more, you can provide payment details
								which will extend your trial to 30 days providing you an extra 16 more days to try our
								app.
							</Typography>
						</div>
						<div>
							<Typography className="text-xl font-semibold">
								Are there discounts for non-profits or educational use?
							</Typography>
							<Typography
								className="mt-2 leading-6"
								color="text.secondary"
							>
								Yes, our Personal and Premium packages are free for non-profits and educational use.
								E-mail your details to us after starting your Free Trial and we will upgrade your
								account if you qualify.
							</Typography>
						</div>
						<div>
							<Typography className="text-xl font-semibold">What is the storage is for?</Typography>
							<Typography
								className="mt-8 leading-6"
								color="text.secondary"
							>
								Since we provide an extremely detailed reporting and analytics tool, they require quite
								a bit storage space. For average use, you don’t have to worry about running out of space
								since the Personal package limits the projects you can have.
							</Typography>
							<Typography
								className="mt-8 leading-6"
								color="text.secondary"
							>
								For some reason if you run out of space, contact us and we will see what can be done
								about it and make sure you are not generating unnecessary reports and/or analytics data.
							</Typography>
						</div>
						<div>
							<Typography className="text-xl font-semibold">
								What happens if I’m not satisfied?
							</Typography>
							<Typography
								className="mt-8 leading-6"
								color="text.secondary"
							>
								If you are still in your free trial period, you can cancel your account at anytime with
								a single click of a button. If you already paid for your first month, we also offer
								30-day money-back guarantee with no questions asked.
							</Typography>
							<Typography
								className="mt-8 leading-6"
								color="text.secondary"
							>
								After first month, you can still cancel your account at any time but we will calculate
								the amount that corresponds to days you have been using our app for that month and
								refund only the remaining amount.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePricingPage;
