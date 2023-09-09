import { FC } from "react";

interface PartnersCardProps {
	image: string;
	url: string;
}
const PartnersCard: FC<PartnersCardProps> = ({ url, image }) => {
	return (
		<a href={`${import.meta.env.VITE_BASE_URL}/url/redirect?id=${url}`}>
			<div
				style={{
					backgroundImage: `url(${image})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
				className={"w-full h-[124px] md:h-[72px] lg:h-[94px]"}
			></div>
		</a>
	);
};

export default PartnersCard;
