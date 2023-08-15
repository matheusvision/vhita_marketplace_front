import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import FuseCountdown from '@fuse/core/FuseCountdown';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email').required('You must enter a email')
});

const defaultValues = {
	email: ''
};

function ClassicComingSoonPage() {
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
						Almost there!
					</Typography>
					<Typography className="mt-2">
						Do you want to be notified when we are ready? Register below so we can notify you about the
						launch!
					</Typography>

					<div className="flex flex-col items-center py-48">
						<FuseCountdown endDate="2023-07-28" />
					</div>

					<form
						name="comingSoonForm"
						noValidate
						className="flex w-full flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Email address"
									type="email"
									error={!!errors.email}
									helperText={errors?.email?.message}
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
							Notify me when you launch
						</Button>

						<Typography
							className="text-md mt-32 font-medium"
							color="text.secondary"
						>
							This isn't a newsletter subscription. We will send one email to you when we launch and then
							you will be removed from the list.
						</Typography>
					</form>
				</div>
			</Paper>
		</div>
	);
}

export default ClassicComingSoonPage;
