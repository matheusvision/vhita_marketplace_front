import FuseUtils from '@fuse/utils/FuseUtils';
import axios, { AxiosError, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { UserProps } from 'app/store/user';
import { number, string } from 'yup';
import { UserModelType } from 'app/store/user/model/UserModel';
import jwtServiceConfig from './jwtServiceConfig';
/* eslint-disable camelcase, class-methods-use-this */
class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			(response: AxiosResponse<unknown>) => response,
			(err: AxiosError) =>
				new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						_setSession(null);
					}
					throw err;
				})
		);
	};

	handleAuthentication = () => {
		const access_token = getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (isAuthTokenValid(access_token)) {
			_setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			_setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = (data: UserModelType) =>
		new Promise((resolve, reject) => {
			axios.post(jwtServiceConfig.signUp, data).then(
				(
					response: AxiosResponse<{
						user: UserProps;
						access_token: string;
						error?: {
							type: 'email' | 'password' | `root.${string}` | 'root';
							message: string;
						}[];
					}>
				) => {
					if (response.data.user) {
						_setSession(response.data.access_token);
						resolve(response.data.user);
						this.emit('onLogin', response.data.user);
					} else {
						reject(response.data.error);
					}
				}
			);
		});

	signInWithEmailAndPassword = (email: string, password: string) =>
		new Promise((resolve, reject) => {
			axios
				.get(jwtServiceConfig.signIn, {
					data: {
						email,
						password
					}
				})
				.then(
					(
						response: AxiosResponse<{
							user: UserProps;
							access_token: string;
							error?: {
								type: 'email' | 'password' | `root.${string}` | 'root';
								message: string;
							}[];
						}>
					) => {
						if (response.data.user) {
							_setSession(response.data.access_token);
							resolve(response.data.user);
							this.emit('onLogin', response.data.user);
						} else {
							reject(response.data.error);
						}
					}
				);
		});

	signInWithToken = () =>
		new Promise((resolve, reject) => {
			axios
				.get(jwtServiceConfig.accessToken, {
					data: {
						access_token: getAccessToken()
					}
				})
				.then((response: AxiosResponse<{ user: UserModelType; access_token: string }>) => {
					if (response.data.user) {
						_setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch((error) => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});

	updateUserData = (user: UserModelType) =>
		axios.post(jwtServiceConfig.updateUser, {
			user
		});

	logout = () => {
		_setSession(null);
		this.emit('onLogout', 'Logged out');
	};
}

function _setSession(access_token: string) {
	if (access_token) {
		setAccessToken(access_token);
		axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
	} else {
		removeAccessToken();
		delete axios.defaults.headers.common.Authorization;
	}
}

function isAuthTokenValid(access_token: string) {
	if (!access_token) {
		return false;
	}
	const decoded: { exp } = jwtDecode(access_token);
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		// eslint-disable-next-line no-console
		console.warn('access token expired');
		return false;
	}

	return true;
}

function getAccessToken() {
	return window.localStorage.getItem('jwt_access_token');
}
function setAccessToken(access_token: string) {
	return window.localStorage.setItem('jwt_access_token', access_token);
}
function removeAccessToken() {
	return window.localStorage.removeItem('jwt_access_token');
}

const instance = new JwtService();

export default instance;
