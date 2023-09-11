import { FC } from "react";

interface PartnersCardProps {
	image: string;
	url: string;
}
const PartnersCard: FC<PartnersCardProps> = ({ url, image }) => {
	return (
		<a
			target="_blank"
			href={url}
			style={{
				backgroundImage: `url(${
					import.meta.env.VITE_BASE_URL
				}/search/image/get?id=${image})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			className={"w-[200px] md:w-full h-[124px] md:h-[72px] lg:h-[94px]"}
		></a>
	);
};

export default PartnersCard;
