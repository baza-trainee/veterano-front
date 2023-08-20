import { FC } from "react";

interface BackdropPropsType {
	isOpen: boolean;
	onClose: () => void;
}

const Backdrop: FC<BackdropPropsType> = ({ isOpen, onClose }) => {
	return isOpen ? (
		<div
			className="fixed top-0 left-0 w-full h-full bg-[#31313180] opacity-100 z-10"
			onClick={onClose}
		/>
	) : null;
};

export default Backdrop;
