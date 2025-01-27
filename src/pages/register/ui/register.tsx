import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "@shared/api/auth.service.ts";
import { Button, Input } from "@shared/ui";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			await AuthService.register({ email, password });
			setError(null);
			navigate("/", { replace: true });
		} catch (e: unknown) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-[400px] mx-auto">
				<form className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<Input
							placeholder="Email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{error && <div className="text-red-500">{error}</div>}
					<Button type={"button"} onClick={handleRegister}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};
