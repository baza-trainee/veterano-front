import React, { FC, ReactNode, useEffect } from "react";

interface ModalWindowProps {
	className: string;
	children?: ReactNode;
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	style?: React.CSSProperties
}

const ModalWindow: FC<ModalWindowProps> = ({
	active,
	setActive,
	className,
	children,
	...props
}) => {

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
				className={`${className} modal-content relative absolute top-0 md:top-[92px]`}
				onClick={(e) => e.stopPropagation()}
				{...props}
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
