import Link from "../Links/Link";

interface CardProps {
	imageSrc: string;
	title: string;
	text: string;
	buttonText?: string;
}

const ProjectCard: React.FC<CardProps> = ({
	imageSrc = "../Photo.svg",
	title = "Проект",
	text = "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
}) => {
	return (
		<div className="sm:w-full md:w-full lg:w-full">
			<img src={imageSrc} alt={title} className="w-full h-auto" />
			<div className="bg-white p-3 sm:px-4 sm:py-6 md:px-3 md:py-6 lg:p-8">
				<h2 className="text-xl font-semibold mb-3">{title}</h2>
				<p className="text-gray-600 mb-6 text-base md:mb-8 md:text-lg">
					{text}
				</p>
				<Link to="my offer" variant="primary" size="small">
					Детальніше
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
