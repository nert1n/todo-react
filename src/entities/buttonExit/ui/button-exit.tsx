import { useNavigate } from "react-router-dom";

import { setAuthenticated } from "@app/store/slices/auth-slice.tsx";
import { AuthService } from "@shared/api/auth.service.ts";

export const ButtonExit = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await AuthService.logout();
			setAuthenticated(false);
			navigate("/sign-in", { replace: true });
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<button onClick={handleLogout}>
			<img alt={"Exit"} src={"/icons/exit.svg"} />
		</button>
	);
};
