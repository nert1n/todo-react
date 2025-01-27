import { IModal } from "@entities/modal/model/types.ts";

export const Modal = ({ children, isOpen, onClose, title }: IModal) => {
	if (!isOpen) return null;

	return (
		<>
			<button
				className={
					"z-10 fixed bg-[rgba(0,0,0,0.3)] left-0 top-0 w-screen h-screen cursor-pointer"
				}
				onClick={onClose}></button>
			<div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
				<div className="flex flex-col bg-white py-4 px-6 gap-2 rounded-2xl min-w-[250px] min-h-[100px]">
					<div className={"flex flex-row justify-between gap-2"}>
						<h2 className={"text-base font-medium"}>{title}</h2>
						<button className={"font-semibold"} onClick={onClose}>
							X
						</button>
					</div>
					<div className={"w-full h-full"}>{children}</div>
				</div>
			</div>
		</>
	);
};
