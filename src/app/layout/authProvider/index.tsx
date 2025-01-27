import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "@app/store/store.ts";

const AuthProvider = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (isAuthenticated) {
		return <Navigate to={"/"} />;
	}

	return (
		<div>
			<Outlet />
		</div>
	);
};

export default AuthProvider;
