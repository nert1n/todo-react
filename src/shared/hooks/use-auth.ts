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

	const refreshAccessToken = async (): Promise<boolean> => {
		try {
			const result = await AuthService.getAuthRefresh();
			localStorage.setItem("access", result.data);
			return true;
		} catch (error) {
			console.error("Refresh token is invalid:", error);
			if (isPrivateRoute) {
				navigate("/");
			}
			return false;
		}
	};

	const checkAccessToken = async (): Promise<boolean> => {
		try {
			const res = await AuthService.getAuthMe();
			return res.data === "OK";
		} catch (error) {
			console.error("Access token is invalid:", error);
			return false;
		}
	};

	return { setAuthenticatedState, refreshAccessToken, checkAccessToken };
};
