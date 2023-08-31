import { FC, ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
	return (
		<div
			className={
				"px-[16px] max-w-[480px] md:px-[24px] md:max-w-[768px] lg:max-w-[1440px] md:mx-auto lg:px-[80px]" +
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
