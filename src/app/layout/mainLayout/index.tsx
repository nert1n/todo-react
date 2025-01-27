import { Outlet } from "react-router-dom";

import { Sidebar } from "@widgets/sidebar/ui/sidebar.tsx";

const MainLayout = () => {
	return (
		<div className={"flex flex-row w-full h-screen bg-[#F2F4F7]"}>
			<Sidebar />
			<div className={"w-full h-full p-4"}>
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
