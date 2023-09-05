import Link from "../Links/Link";
import Typography from "../Typography/Typography.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";

interface CardProps {
	imageSrc: string;
	title: string;
	text: string;
	buttonText?: string;
	variant: "carousel" | "search";
	url: string;
	className?: string;
}

const ProjectCard: React.FC<CardProps> = ({
	imageSrc = "../Photo.svg",
	title = "Проект",
	text = "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
	variant = "carousel",
	url,
	className,
}) => {
	const { isTablet, isDesktop } = useMedia();

	const cardStyle = {
		carousel: {
			wrapper: "h-[606px] md:h-[588px] lg:h-[692px]",
			image: "w-full h-[240px] md:h-[246px] lg:h-[266px]",
			info: "p-3 sm:px-4 sm:py-6 md:px-3 md:py-6 lg:p-8 h-[366px] md:h-[342px] lg:h-[426px] ",
		},
		search: {
			wrapper: "flex flex-col md:flex-row justify-between mb-[32px]",
			image: "w-full md:w-[165px] lg:w-[413px] lg:h-[292px]",
			info: "flex w-full flex-col py-6 px-4 justify-around md:pt-[2px] md:pb-4 lg:py-[32px] lg:px-4 flex-shrink-1 ",
		},
	};

	return (
		<div
			className={
				cardStyle[variant].wrapper + " " + " sm:w-full md:w-full lg:w-full"
			}
		>
			<img src={imageSrc} alt={title} className={cardStyle[variant].image} />
			<div
				className={
					className +
					" " +
					cardStyle[variant].info +
					" flex flex-col justify-between " +
					"bg-white"
				}
			>
				<div>
					<Typography variant={isTablet ? "h5" : "h4"} component={"h3"}>
						{title}
					</Typography>
					<Typography
						variant={"p"}
						component={"p"}
						className={
							"h-[216px] line-clamp-[9] overflow-y-hidden text-ellipsis whitespace-normal mt-3 mb-6 md:line-clamp-[8] md:h-[192px] lg:h-[110px] lg:mb-auto lg:h-[252px] lg:line-clamp-[9]"
						}
					>
						{text}
					</Typography>
				</div>

				<Link
					to={url}
					variant="primary"
					size={isDesktop ? "large" : "small"}
					className={
						"h-216px w-[136px] md:w-[165px] lg:w-[170px] lg:text-[16px]"
					}
				>
					Детальніше
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
