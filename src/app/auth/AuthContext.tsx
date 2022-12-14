import * as React from 'react';
import { useEffect, useState } from 'react';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { logoutUser, setUser } from 'app/store/user/userSlice';
import { useAppDispatch } from 'app/store/index';
import jwtService from './services/jwtService';

const AuthContext = React.createContext();

function AuthProvider({ children }: any) {
	const [isAuthenticated, setIsAuthenticated] = useState(undefined);
	const [waitAuthCheck, setWaitAuthCheck] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		jwtService.on('onAutoLogin', () => {
			dispatch(showMessage({ message: 'Signing in with JWT' }));

			/**
			 * Sign in and retrieve user data with stored token
			 */
			jwtService
				.signInWithToken()
				.then((user) => {
					success(user, 'Signed in with JWT');
				})
				.catch((error) => {
					pass(error.message);
				});
		});

		jwtService.on('onLogin', (user: any) => {
			success(user, 'Signed in');
		});

		jwtService.on('onLogout', () => {
			pass('Signed out');

			dispatch(logoutUser());
		});

		jwtService.on('onAutoLogout', (message: any) => {
			pass(message);

			dispatch(logoutUser());
		});

		jwtService.on('onNoAccessToken', () => {
			pass();
		});

		jwtService.init();

		function success(user: any, message: any) {
			if (message) {
				dispatch(showMessage({ message }));
			}

			Promise.all([
				dispatch(setUser(user))
				// You can receive data in here before app initialization
			]).then((values) => {
				setWaitAuthCheck(false);
				setIsAuthenticated(true);
			});
		}

		function pass(message: any) {
			if (message) {
				dispatch(showMessage({ message }));
			}

			setWaitAuthCheck(false);
			setIsAuthenticated(false);
		}
	}, [dispatch]);

	return waitAuthCheck ? (
		<FuseSplashScreen />
	) : (
		<AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
	);
}

function useAuth() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
