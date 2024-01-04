import { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export type FirebaseAuthProps = {
	onSignedIn?: (user: firebase.User) => void;
	onSignedOut?: () => void;
	onError?: (error: firebase.auth.Error) => void;
};

export type FirebaseAuth = {
	user: firebase.User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	signOut: () => Promise<void>;
	updateUser: (userUpdate: Partial<firebase.User>) => Promise<void>;
};

const useFirebaseAuth = (props: FirebaseAuthProps): FirebaseAuth => {
	const { onSignedIn, onSignedOut, onError } = props;

	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Effect to handle the initial authentication state
	useEffect(() => {
		let isInitialCheck = true;

		const unsubscribe =
			firebase.apps.length &&
			firebase.auth().onAuthStateChanged(
				(user) => {
					if (user && !isAuthenticated) {
						setUser(user);
						setIsAuthenticated(true);
						onSignedIn?.(user);
					} else if (!isInitialCheck && isAuthenticated) {
						setUser(null);
						setIsAuthenticated(false);
						onSignedOut?.();
					}
					setIsLoading(false);
					isInitialCheck = false;
				},
				(error) => {
					onError?.(error);
					setIsLoading(false);
				}
			);

		return unsubscribe;
	}, [isAuthenticated]);

	const signIn = useCallback((email: string, password: string) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}, []);

	const signUp = useCallback((email: string, password: string) => {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}, []);

	const signOut = useCallback(() => {
		return firebase.auth().signOut();
	}, []);

	const updateUser = useCallback(
		(userUpdate: Partial<firebase.User>) => {
			if (!user) {
				return Promise.reject(new Error('No user is signed in'));
			}
			return user.updateProfile(userUpdate);
		},
		[user]
	);

	return { user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUser };
};

export default useFirebaseAuth;
