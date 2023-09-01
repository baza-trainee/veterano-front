import { FC, ReactNode } from "react";
import Typography from "../Typography/Typography";
import Container from "../Container/Container.tsx";

interface SectionProps {
	title?: string;
	className?: string;
	children?: ReactNode;
}

const Section: FC<SectionProps> = ({
	className = "",
	title = "",
	children,
}) => {
	return (
		<section
			className={
				"py-section-sm md:py-section-md lg:py-section-lg" + " " + className
			}
		>
			<Container>
				{title && (
					<Typography
						variant="h2"
						className="text-center mb-section-content-sm md:mb-section-content-md lg:mb-section-content-lg"
					>
						{title}
					</Typography>
				)}
				<div className="">{children}</div>
			</Container>
		</section>
	);
};

export default Section;
