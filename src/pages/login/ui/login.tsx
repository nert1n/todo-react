import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "@shared/api/auth.service.ts";
import { Button, Input } from "@shared/ui";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await AuthService.login({ email, password });
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
		<div className={"w-full max-w-[400px] mx-auto mt-14"}>
			<div className={"flex flex-col gap-2"}>
				<div className={"flex flex-col gap-1"}>
					<Input
						placeholder={"Email"}
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						placeholder={"Password"}
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				{error && <div className="text-red-500">{error}</div>}
				<Button onClick={handleLogin}>Login</Button>
			</div>
		</div>
	);
};
