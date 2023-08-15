import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import JwtService from '../../auth/services/jwtService';

function SignOutPage() {
	useEffect(() => {
		setTimeout(() => {
			JwtService.logout();
		}, 1000);
	}, []);

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
			<Paper className="rounded-0 sm:min-h-auto flex min-h-full w-full items-center px-16 py-32 sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
				<div className="max-w-320 sm:w-320 mx-auto w-full sm:mx-0">
					<img
						className="mx-auto w-48"
						src="assets/images/logo/logo.svg"
						alt="logo"
					/>

					<Typography className="mt-32 text-center text-4xl font-extrabold leading-tight tracking-tight">
						You have signed out!
					</Typography>
				</div>
			</Paper>
		</div>
	);
}

export default SignOutPage;
