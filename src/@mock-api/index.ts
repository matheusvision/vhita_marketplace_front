/* eslint-disable import/no-import-module-exports */
import history from '@history';
import mock from './mock';
import './api/auth-api';
import './api/notifications-api';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
	const { pathname } = history.location;
	history.push('/loading');
	history.push({ pathname });
}
