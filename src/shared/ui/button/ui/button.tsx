import { IButton } from "@shared/ui/button/model/types.ts";

export const Button = ({ children, ...props }: IButton) => {
	return (
		<button
			className={
				"rounded-[8px] text-[#fff] py-2 px-6 bg-[#4186F4] transition hover:bg-[#497CCF]"
			}
			{...props}>
			{children}
		</button>
	);
};
