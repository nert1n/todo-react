import { forwardRef } from "react";

import { IInput } from "@shared/ui/input/model/types.ts";

export const Input = forwardRef<HTMLInputElement, IInput>(
	({ ...props }, ref) => {
		return <input ref={ref} className="border rounded-[8px] p-2" {...props} />;
	}
);

Input.displayName = "Input";
