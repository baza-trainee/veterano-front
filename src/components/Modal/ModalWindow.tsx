import { FC, ReactNode } from "react";

interface ModalWindowProps {
	className: string,
	children?: ReactNode,
	active: boolean,
	setActive: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalWindow: FC<ModalWindowProps> = ({ active, setActive, className, children }) => {

	return (

		<div
			className={active ? "modal active" : "modal"}
			onClick={() => setActive(false)}
		>
			<div
				className={`${className} modal-content`}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					onClick={() => setActive(false)}
					className={"flex justify-end cursor-pointer"}>
					<img src="/images/close.svg" alt="close" />
				</div>
				{children}
			</div>
		</div>
	);
};

export default ModalWindow;