import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setAuthenticated } from "@app/store/slices/auth-slice.tsx";
import { useAuth } from "@shared/hooks/use-auth.ts";
import { Loader } from "@shared/ui/loader";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { checkAccessToken, refreshAccessToken } = useAuth();
	const [isAuthLoading, setIsAuthLoading] = useState<boolean>();
	const dispatch = useDispatch();

	const authLogic = async () => {
		setIsAuthLoading(true);

		const isAuthenticated = await checkAccessToken();

		if (isAuthenticated) {
			dispatch(setAuthenticated(true));
		} else {
			const tokenRefreshed = await refreshAccessToken();
			if (!tokenRefreshed) {
				setIsAuthLoading(false);
				return;
			}
			const isTokenValid = await checkAccessToken();
			dispatch(setAuthenticated(isTokenValid));
		}

		setIsAuthLoading(false);
	};

	useEffect(() => {
		authLogic();
	}, []);

	if (isAuthLoading) {
		return <Loader />;
	}

	return children;
};
