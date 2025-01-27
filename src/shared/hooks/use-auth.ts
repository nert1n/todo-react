import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { privateRoutes } from "@app/routes/private-routes.tsx";
import { setAuthenticated } from "@app/store/slices/auth-slice.tsx";
import { AuthService } from "@shared/api/auth.service.ts";

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isPrivateRoute = privateRoutes.some(route =>
		location.pathname.startsWith(route.path)
	);

	const setAuthenticatedState = (auth: boolean) => {
		dispatch(setAuthenticated(auth));
	};

	const refreshAccessToken = async () => {
		try {
			const user = await AuthService.refreshToken();
			if (user) {
				localStorage.setItem("isAuth", "true");
				return true;
			}
			return false;
		} catch (error) {
			console.error("Failed to refresh token:", error);
			if (isPrivateRoute) {
				navigate("/sign-in");
			}
			return false;
		}
	};

	const checkAccessToken = async () => {
		try {
			const user = await AuthService.getCurrentUser();
			return !!user;
		} catch (error) {
			console.error("Invalid access token:", error);
			return false;
		}
	};

	return { setAuthenticatedState, refreshAccessToken, checkAccessToken };
};
