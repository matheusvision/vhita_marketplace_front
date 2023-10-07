import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

/**
 * The jwt auth doc.
 * @returns The jsx component.
 */
function JwtAuthDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				JWT Authentication Service Example
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				The JWT Authentication Service Example in Fuse React provides a secure way to authenticate users and
				protect sensitive data. With this service, users can sign up and sign in to access protected resources.
				The service also saves user data, such as user shortcuts, layout, and theme settings, to a database for
				easy retrieval.
			</Typography>

			<ul>
				<li className="mb-12">
					To sign up, click on the <Link to="/sign-up">sign up</Link> link.
				</li>
				<li className="mb-12">
					To sign in, click on the <Link to="/sign-in">sign in</Link> link.
				</li>
				<li className="mb-12">
					The related service folder is located at <code>/src/app/auth/services/jwtService</code>. This folder
					contains the necessary files to customize the authentication service to fit specific needs.
				</li>
			</ul>

			<Typography
				className="mt-32 mb-16"
				component="p"
			>
				To use the JWT Authentication Service Example in your Fuse React application, make sure to wrap the{' '}
				<code>&lt;Router&gt;</code> component with the <code>&lt;AuthProvider&gt;</code> component in{' '}
				<code>src/app/App.tsx</code>. The service initializes in the AuthProvider component.
			</Typography>

			<Typography
				className="my-24 italic"
				component="p"
				color="text.secondary"
			>
				Important: We don't give you any backend code. We are demonstrating the usage with
				<code>@mock-api</code> (which is works with https requests as real).
			</Typography>
		</>
	);
}

export default JwtAuthDoc;
