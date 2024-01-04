import React, { createContext, useCallback, useContext, useMemo } from 'react';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import { useAppSelector, useAppDispatch } from 'app/store';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen/FuseSplashScreen';
import { resetUser, selectUserRole, setUser, updateUser } from 'src/app/auth/user/userSlice';
import BrowserRouter from '@fuse/core/BrowserRouter';
import withSlices from 'app/store/withSlices';
import { AxiosError } from 'axios';
import { PartialDeep } from 'type-fest';
import useJwtAuth, { JwtAuth } from './services/jwt/useJwtAuth';
import userSlice from './user/userSlice';
import { User } from './user';
import useFirebaseAuth from './services/firebase/useFirebaseAuth';

/**
 * Initialize Firebase
 */

export type SignInPayload = {
	email: string;
	password: string;
};

export type SignUpPayload = {
	displayName: string;
	password: string;
	email: string;
};

type AuthContext = {
	jwtService?: JwtAuth<User, SignInPayload, SignUpPayload>;
	firebaseService?: ReturnType<typeof useFirebaseAuth>;
	signOut?: () => void;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext>({
	isAuthenticated: false
});

type AuthProviderProps = { children: React.ReactNode };

function AuthRouteProvider(props: AuthProviderProps) {
	const { children } = props;
	const dispatch = useAppDispatch();

	/**
	 * Jwt auth service
	 */
	const jwtService = useJwtAuth({
		config: {
			tokenStorageKey: 'jwt_access_token',
			signInUrl: 'mock-api/auth/sign-in',
			signUpUrl: 'mock-api/auth/sign-up',
			tokenRefreshUrl: 'mock-api/auth/refresh',
			getUserUrl: 'mock-api/auth/user',
			updateUserUrl: 'mock-api/auth/user',
			updateTokenFromHeader: true
		},
		onSignedIn: (userData: User) => {
			onSignedIn(userData, 'jwt');
		},
		onSignedOut,
		onUserUpdated,
		onError
	});

	const firebaseService: AuthContext['firebaseService'] = useFirebaseAuth({
		onSignedIn: (user) => {
			onSignedIn(
				{
					uid: user.uid,
					role: ['admin'],
					data: {
						displayName: user.displayName
					}
				},
				'firebase'
			);
		},
		onSignedOut
	});

	const userRole = useAppSelector(selectUserRole);

	const isLoading = useMemo(
		() => jwtService?.isLoading || firebaseService?.isLoading,
		[jwtService?.isLoading, firebaseService?.isLoading]
	);

	const isAuthenticated = useMemo(
		() => jwtService?.isAuthenticated || firebaseService?.isAuthenticated,
		[jwtService?.isAuthenticated, firebaseService?.isAuthenticated]
	);

	/**
	 * On User Sign In Event
	 */
	function onSignedIn(_user: User, _authService: string) {
		dispatch(setUser(_user));
		setAuthService(_authService);
	}

	/**
	 * On User Sign Out Event
	 */
	function onSignedOut() {
		dispatch(resetUser());
		resetAuthService();
	}

	/**
	 * On User Updated Event
	 */
	function onUserUpdated(_userData: User) {
		dispatch(updateUser(_userData));
	}

	/**
	 * On Error Event
	 */
	function onError(error: AxiosError) {
		console.warn(error);
	}

	const combinedAuth = useMemo<AuthContext>(
		() => ({
			jwtService,
			firebaseService,
			signOut: () => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.signOut();
				}

				if (authService === 'firebase') {
					return firebaseService?.signOut();
				}

				onSignedOut();

				return null;
			},
			updateUser: (userData: PartialDeep<User>) => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.updateUser(userData);
				}

				if (authService === 'firebase') {
					return firebaseService?.updateUser(userData);
				}
				return null;
			},
			isAuthenticated
		}),
		[isAuthenticated]
	);

	const getAuthService = useCallback(() => {
		return localStorage.getItem('authService');
	}, []);

	const setAuthService = useCallback((authService: string) => {
		if (authService) {
			localStorage.setItem('authService', authService);
		}
	}, []);

	const resetAuthService = useCallback(() => {
		localStorage.removeItem('authService');
	}, []);

	if (isLoading) {
		return <FuseSplashScreen />;
	}

	return (
		<AuthContext.Provider value={combinedAuth}>
			<BrowserRouter>
				<FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContext {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}
	return context;
}

const AuthRouteProviderWithReducer = withSlices([userSlice])(AuthRouteProvider);

export { useAuth, AuthRouteProviderWithReducer as AuthRouteProvider };
