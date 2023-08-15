import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

function ClassicConfirmationRequiredPage() {
	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
			<Paper className="rounded-0 sm:min-h-auto min-h-full w-full px-16 py-32 sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
				<div className="max-w-320 sm:w-320 mx-auto w-full sm:mx-0">
					<img
						className="w-48"
						src="assets/images/logo/logo.svg"
						alt="logo"
					/>

					<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
						Confirmation required
					</Typography>
					<Typography className="mt-16">
						A confirmation mail with instructions has been sent to your email address. Follow those
						instructions to confirm your email address and activate your account.
					</Typography>

					<Typography
						className="text-md mt-32 font-medium"
						color="text.secondary"
					>
						<span>Return to</span>
						<Link
							className="text-primary-500 ml-4 hover:underline"
							to="/sign-in"
						>
							sign in
						</Link>
					</Typography>
				</div>
			</Paper>
		</div>
	);
}

export default ClassicConfirmationRequiredPage;
