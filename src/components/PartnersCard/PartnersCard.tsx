import { FC } from "react";

interface PartnersCardProps{
	image: string
}
const PartnersCard: FC<PartnersCardProps> = ({image}) => {
	return (
		<div style={{
			backgroundImage: `url(${image})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		}} className={'w-[200px] md:w-full h-[124px] md:h-[72px] lg:h-[94px]'}>
		</div>
	);
};

export default PartnersCard;