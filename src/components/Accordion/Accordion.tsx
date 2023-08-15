import React, { useState } from "react";

interface AccordionItem {
	title: string;
	content: string;
}

interface AccordionProps {
	data: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<div key={index}>
					<div
						className={`flex items-center justify-between cursor-pointer pb-3 pt-3 ${
							activeIndex === index ? "" : "border-b border-black"
						}`}
						onClick={() => toggleAccordion(index)}
					>
						<div className="text-lg text-black font-medium">{item.title}</div>
						<div>
							{activeIndex === index ? (
								<img src="./images/black-arrow-up.svg" />
							) : (
								<img src="./images/black-arrow-down.svg" />
							)}
						</div>
					</div>
					{activeIndex === index && (
						<div className="pt-4 text-grey100">{item.content}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
