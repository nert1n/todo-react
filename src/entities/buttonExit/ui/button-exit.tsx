import { useNavigate } from "react-router-dom";

import { AuthService } from "@shared/api/auth.service.ts";

export const ButtonExit = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await AuthService.logout();
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
