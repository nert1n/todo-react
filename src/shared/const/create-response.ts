import { AxiosResponse } from "axios";

export const createResponse = <T>(res: AxiosResponse<T>) => ({
	data: res.data,
	status: res.status,
	statusText: res.statusText,
});
