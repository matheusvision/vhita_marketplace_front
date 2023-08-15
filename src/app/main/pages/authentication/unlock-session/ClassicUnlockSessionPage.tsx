import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter your name'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	name: 'Brian Hughes',
	password: '',
	passwordConfirm: ''
};

function ClassicUnlockSessionPage() {
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit() {
		reset(defaultValues);
	}

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
						Unlock your session
					</Typography>
					<Typography className="font-medium">Your session is locked due to inactivity</Typography>

					<form
						name="registerForm"
						noValidate
						className="mt-32 flex w-full flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Full name"
									autoFocus
									type="name"
									error={!!errors.name}
									helperText={errors?.name?.message}
									variant="outlined"
									fullWidth
									disabled
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Password"
									type="password"
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<Button
							variant="contained"
							color="secondary"
							className=" mt-4 w-full"
							aria-label="Register"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							type="submit"
							size="large"
						>
							Unlock your session
						</Button>

						<Typography
							className="text-md mt-32 font-medium"
							color="text.secondary"
						>
							<span>I'm not</span>
							<Link
								className="ml-4"
								to="/sign-in"
							>
								Brian Hughes
							</Link>
						</Typography>
					</form>
				</div>
			</Paper>
		</div>
	);
}

export default ClassicUnlockSessionPage;
