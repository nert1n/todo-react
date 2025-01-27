import { IError } from "@pages/error/model/types";

export const ErrorPage = ({ errorText }: IError) => {
	return <div>Error {errorText}</div>;
};
