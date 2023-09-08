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
	const [activeIndices, setActiveIndices] = useState<number[]>([]);

	const toggleAccordion = (index: number) => {
		const isActive = activeIndices.includes(index);

		if (isActive) {
			setActiveIndices(activeIndices.filter((i) => i !== index));
		} else {
			setActiveIndices([...activeIndices, index]);
		}
	};

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<div
					key={index}
					className={`${
						!activeIndices.includes(index) ? "" : "border-b border-black"
					}`}
				>
					<div
						className={`flex items-center justify-between cursor-pointer pb-3 pt-3 ${
							activeIndices.includes(index) ? "" : "border-b border-black"
						}`}
						onClick={() => toggleAccordion(index)}
					>
						<div className="text-lg text-black font-medium">{item.title}</div>
						<div>
							{activeIndices.includes(index) ? (
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
					{activeIndices.includes(index) && (
						<div className="font-light pt-2 pb-6 text-grey100 md:max-w-[675px] lg:max-w-[1070px] ">
							{item.content}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
