import { Link } from "react-router-dom";

import { ButtonExit } from "@entities/buttonExit/ui/button-exit.tsx";

export const Sidebar = () => {
	return (
		<div
			className={
				"flex flex-col justify-between items-center bg-white w-[84px] py-8 px-2"
			}>
			<div>
				<Link to={"/"}>
					<img alt="Logo" src={"/icons/logo.svg"} />
				</Link>
			</div>
			<ButtonExit />
		</div>
	);
};
