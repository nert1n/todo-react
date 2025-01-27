import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { RootState } from "@app/store/store.ts";

const PrivateLayout = () => {
	const { isAuthenticated, loading } = useSelector(
		(state: RootState) => state.auth
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !loading) {
			navigate("/login", { replace: true });
		}
	}, [isAuthenticated]);

	return <Outlet />;
};

export default PrivateLayout;
