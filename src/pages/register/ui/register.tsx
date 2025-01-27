import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { AuthService } from "@shared/api/auth.service.ts";
import { Button, Input } from "@shared/ui";

type RegisterInputs = {
	email: string;
	password: string;
};

export const Register = () => {
	const [error, setError] = useState<string | null>(null);

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<RegisterInputs>();

	const navigate = useNavigate();

	const handleRegister = async (data: RegisterInputs) => {
		try {
			await AuthService.register(data);
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

	const onSubmit = (data: RegisterInputs) => {
		handleRegister(data);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-[400px] mx-auto">
				<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
					<h1 className={"mx-auto text-2xl font-semibold"}>Registration</h1>
					<div className="flex flex-col gap-1">
						<Input
							placeholder="Email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
									message: "Invalid email format",
								},
							})}
						/>
						{errors.email && (
							<div className="text-red-500 text-sm">
								{errors.email.message?.toString()}
							</div>
						)}

						<Input
							placeholder="Password"
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
								maxLength: {
									value: 20,
									message: "Password must be no more than 20 characters",
								},
								pattern: {
									value:
										/^(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*@^])[\d!#$%&*@A-Z^a-z]{6,20}$/,
									message:
										"Password must contain at least one uppercase letter, one number, and one special character",
								},
							})}
						/>
						{errors.password && (
							<div className="text-red-500 text-sm">
								{errors.password.message?.toString()}
							</div>
						)}
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<div className={"flex flex-col gap-1"}>
						<Button type={"submit"}>Register</Button>
						<Link
							className={"text-sm text-[#4186F4] underline"}
							to={"/sign-in"}>
							Don&apos;t have an account yet?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
