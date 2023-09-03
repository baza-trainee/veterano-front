import { FC, ReactNode, useEffect } from "react";
import { useMedia } from "../../hooks/useMedia.tsx";

interface ModalWindowProps {
	className: string;
	children?: ReactNode;
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWindow: FC<ModalWindowProps> = ({
	active,
	setActive,
	className,
	children,
}) => {
	const {isMobile} = useMedia()
	useEffect(() => {
		active
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflowY = "auto");
	}, [active]);
	return (
		<div
			className={active ? "modal active relative" : "modal"}
			onClick={() => setActive(false)}
		>
			<div
				style={{
					position: "absolute",
					top: isMobile? '0' : '92px'
				}}
				className={`${className} modal-content relative`}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					onClick={() => setActive(false)}
					className={
						"absolute right-[16px] md:right-[24px] top-[24px] flex justify-end cursor-pointer"
					}
				>
					<img src="/images/close.svg" alt="close" />
				</div>
				{children}
			</div>
		</div>
	);
};

export default ModalWindow;
