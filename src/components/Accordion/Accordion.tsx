import React, { useState } from "react";
import ArrowButton from "../ArrowButton/ArrowButton";

interface AccordionItem {
	title: string;
	content: string;
}

interface AccordionProps {
	data: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
	const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

	const toggleAccordion = (index: number) => {
		if (activeIndexes.includes(index)) {
			setActiveIndexes(activeIndexes.filter((item) => item !== index));
		} else {
			setActiveIndexes([...activeIndexes, index]);
		}
	};

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<div key={index}>
					<div
						className={`flex items-center justify-between cursor-pointer pb-3 pt-3 ${
							activeIndexes.includes(index) ? "" : "border-b border-black"
						}`}
						onClick={() => toggleAccordion(index)}
					>
						<div className="text-lg text-black font-medium">{item.title}</div>
						<div>
							{activeIndexes.includes(index) ? (
								<ArrowButton disabled={false} direction="top" variant="faq" />
							) : (
								<ArrowButton
									disabled={false}
									direction="bottom"
									variant="faq"
								/>
							)}
						</div>
					</div>
					{activeIndexes.includes(index) && (
						<div className="pt-4 text-grey100">{item.content}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
