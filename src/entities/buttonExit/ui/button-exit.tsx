import { AuthService } from "@shared/api/auth.service.ts";
import { Button } from "@shared/ui";

export const ButtonExit = () => {
	const handleLogout = async () => {
		try {
			await AuthService.logout();
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return <Button onClick={handleLogout}>Logout</Button>;
};
