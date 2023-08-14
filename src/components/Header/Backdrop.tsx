import { FC } from "react";

interface BackdropPropsType {
	isOpen: boolean;
	onClose: () => void;
}

const Backdrop: FC<BackdropPropsType> = ({ isOpen, onClose }) => {
	return isOpen ? (
		<div
			className="fixed top-0 left-0 w-full h-full bg-[#31313180] opacity-50 "
			onClick={onClose}
		/>
	) : null;
};

export default Backdrop;
