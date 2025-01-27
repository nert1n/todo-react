import axios from "axios";

import { createResponse } from "@shared/const/create-response.ts";

export const AuthService = {
	async getAuthMe() {
		const headers = {
			Authorization: localStorage.getItem("access") ?? "",
		};
		const res = await axios.get("/auth/me", {
			headers,
			withCredentials: true,
		});
		return createResponse(res);
	},

	async getAuthRefresh() {
		const res = await axios.get("/auth/refresh", { withCredentials: true });
		return createResponse(res);
	},

	async postLogin(email: string, password: string) {
		const res = await axios.post(
			"/auth/login",
			{ email, password },
			{ withCredentials: true }
		);
		return createResponse(res);
	},

	async postRegistration(email: string, password: string, username: string) {
		const res = await axios.post("/auth/mail", { email, password, username });
		return createResponse(res);
	},

	async getLogout() {
		const res = await axios.get("/auth/logout", { withCredentials: true });
		return createResponse(res);
	},

	async postAccountRecovery(email: string) {
		const res = await axios.post("/auth/recovery", { email });
		return createResponse(res);
	},

	async getValidation(searchParams: URLSearchParams) {
		const params = { access: searchParams.get("access") };
		const res = await axios.get("/auth/validPage", { params });
		return createResponse(res);
	},

	async postVerify(searchParams: URLSearchParams, code: number) {
		const params = { access: searchParams.get("access") };
		const res = await axios.post("/auth/verify", { code }, { params });
		return createResponse(res);
	},
};
