import { FC } from "react";

interface CloseBtnProps {
	onClick?: () => void;
	disabled?: boolean;
}

const CloseBtn: FC<CloseBtnProps> = ({ onClick, disabled = false }) => {
	return (
		<button
			onClick={onClick}
			className={`${ disabled ? 'bg-grey50 pointer-events-none' : 'bg-black cursor-pointer '} ` + "border border-transparent group hover:bg-white hover:border-2 hover:border-black rounded w-[48px] h-[48px] relative"}>
			<span
				className="block bg-white group-hover:bg-black absolute w-[0.2rem] h-8 transform rotate-45 origin-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></span>
			<span
				className="block bg-white group-hover:bg-black absolute w-[0.2rem] h-8 transform -rotate-45 origin-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></span>
		</button>
	);
};

export default CloseBtn;