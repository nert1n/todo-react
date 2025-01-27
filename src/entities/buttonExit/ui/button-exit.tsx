import { useNavigate } from "react-router-dom";

import { AuthService } from "@shared/api/auth.service.ts";
import { Button } from "@shared/ui";

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

	return <Button onClick={handleLogout}>Logout</Button>;
};
