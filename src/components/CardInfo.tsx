import React, { ReactNode, MouseEvent } from "react";
import Button from "../UIKit/Button";

interface CardProps {
	imageSrc: string;
	title: string;
	text: string;
	buttonText: string;
	onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CardInfo: React.FC<CardProps> = ({
	imageSrc = "../Photo.svg",
	title = "Проект",
	text = "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
	onButtonClick,
}) => {
	return (
		<div className="sm:w-[320px] md:w-[350px] lg:w-[413px]">
			<img src={imageSrc} alt={title} className="w-full h-auto" />
			<div className="bg-white p-3 sm:px-4 sm:py-6 md:px-3 md:py-6 lg:p-8">
				<h2 className="text-xl font-semibold mb-3">{title}</h2>
				<p className="text-gray-600 mb-6 text-base md:mb-8 md:text-lg">
					{text}
				</p>
				<Button
					onClick={onButtonClick}
					variant="primary"
					size="small"
					className=""
					disabled={false}
				>
					Детальніше
				</Button>
			</div>
		</div>
	);
};

export default CardInfo;
