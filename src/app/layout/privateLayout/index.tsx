import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "@app/store/store.ts";

const PrivateLayout = () => {
	const { isAuthenticated, loading } = useSelector(
		(state: RootState) => state.auth
	);

	if (!isAuthenticated && !loading) {
		return <Navigate to={"/login"} />;
	}

	return <Outlet />;
};

export default PrivateLayout;
