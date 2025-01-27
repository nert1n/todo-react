import { IInput } from "@shared/ui/input/model/types.ts";

export const Input = ({ ...props }: IInput) => {
	return <input className={"border rounded-[8px] p-2"} {...props} />;
};
