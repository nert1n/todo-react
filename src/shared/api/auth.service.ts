import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@app/index";

export const AuthService = {
	async login({ email, password }: { email: string; password: string }) {
		return await signInWithEmailAndPassword(auth, email, password);
	},
	async register({ email, password }: { email: string; password: string }) {
		return await createUserWithEmailAndPassword(auth, email, password);
	},
	async logout() {
		return await signOut(auth);
	},
	async getCurrentUser() {
		return new Promise((resolve, reject) => {
			onAuthStateChanged(auth, user => {
				if (user) {
					resolve(user);
				} else {
					reject(null);
				}
			});
		});
	},
	async refreshToken() {
		const user = auth.currentUser;
		if (user) {
			await user.getIdToken(true);
			return user;
		}
		throw new Error("No user to refresh token for");
	},
};
