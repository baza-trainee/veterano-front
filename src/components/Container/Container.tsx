import { FC, ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
	return (
		<div
			className={
				"max-w-[480px] md:max-w-[768px] lg:max-w-[1440px] mx-auto" +
				" " +
				className
			}
			{...props}
		>
			{children}
		</div>
	);
};

export default Container;