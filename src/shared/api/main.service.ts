import axios from "axios";

import { BACKEND_URL } from "@shared/const/originUrl/backend-url.ts";

export default class MainService {
	static async getMain() {
		const res = await axios.get(`${BACKEND_URL}/main`, {
			withCredentials: true,
		});
		return { data: res.data, status: res.status, statusText: res.statusText };
	}
}
