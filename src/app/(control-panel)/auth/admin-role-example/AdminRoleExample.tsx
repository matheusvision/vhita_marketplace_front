import FuseHighlight from '@fuse/core/FuseHighlight';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { NavLink } from 'react-router';

/**
 * AdminRoleExample component renders the page for admin users.
 */
function AdminRoleExample() {
	return (
		<FusePageCarded
			header={
				<div className="flex flex-1 items-center justify-between p-24">
					<Typography className="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate">
						Admin: Auth role example page
					</Typography>
					<Button
						component={NavLink}
						variant="contained"
						color="secondary"
						to="/sign-out"
						startIcon={<FuseSvgIcon>heroicons-outline:arrow-right-on-rectangle</FuseSvgIcon>}
					>
						Sign out
					</Button>
				</div>
			}
			content={
				<div className="p-24">
					<Typography className="mb-24">
						You can see this page because you have logged in and have permission. Otherwise you should be
						redirected to login page.
					</Typography>

					<Typography className="mb-24">This is the page's config file:</Typography>

					<FuseHighlight
						component="pre"
						className="language-js"
					>
						{`
              import {authRoles} from 'auth';
              import AdminRoleExample from './AdminRoleExample';

              export const AdminRoleExampleConfig = {
                  settings: {
                      layout: {
                          config: {}
                      }
                  },
                  auth    : authRoles.admin,//['admin']
                  routes  : [
                      {
                          path     : '/auth/admin-role-example',
                          element: <AdminRoleExample/>
                      }
                  ]
              };
              `}
					</FuseHighlight>

					<Typography className="my-24">
						You can also hide the navigation item/collapse/group with user roles by giving auth property.
					</Typography>

					<FuseHighlight
						component="pre"
						className="language-json"
					>
						{`
              export const fuseNavigationConfig = [
                 {
                      'id'   : 'only-admin-navigation-item',
                      'title': 'Nav item only for Admin',
                      'type' : 'item',
                      'auth' : authRoles.admin,//['admin']
                      'url'  : '/auth/admin-role-example',
                      'icon' : 'verified_user'
                  }
              ];
          `}
					</FuseHighlight>
				</div>
			}
		/>
	);
}

export default AdminRoleExample;
