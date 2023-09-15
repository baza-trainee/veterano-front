import { FC, useEffect, useRef, useState } from "react";
import ArrowButton from "../ArrowButton/ArrowButton.tsx";

interface CarouselProps {
	items: any[];
	gap: number;
	slidesPerView: number;
	component: React.ComponentType<any>;
	button?: () => React.ReactElement;
}

const Carousel: FC<CarouselProps> = ({ items, gap, slidesPerView, component: Component, button, }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [slideWidth, setSlideWidth] = useState(0);

	useEffect(() => {
		if (containerRef.current) {
			const containerWidth = containerRef.current
				? containerRef.current.offsetWidth
				: 0;
			const totalGaps = gap * (slidesPerView - 1);
			const width = (containerWidth - totalGaps) / slidesPerView;
			setSlideWidth(width);
		}
	}, []);

	const handlePrev = () => {
		setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
	};

	const handleNext = () => {
		setCurrentSlide(
			currentSlide + slidesPerView < items.length
				? currentSlide + 1
				: currentSlide
		);
	};

	return (
		<div ref={containerRef} className={'overflow-hidden m-auto'}>
			<div
				className="flex items-center relative "
				style={{
					transition: "left 0.9s ease-in-out",
					left: `-${currentSlide * slideWidth + currentSlide * gap}px`,
				}}
			>
				{items.map((item, index) => (
					<div
						key={index}
						className={"flex justify-center md:justify-start"}
						style={{
							minWidth: `${slideWidth}px`,
							marginRight: (index < items.length - 1) ? `${gap}px` : "0px",
						}}
					>
						<Component {...item} />
					</div>
				))}
			</div>
			<div
				className={
					button
						? "carousel-actions justify-between md:flex-row md:justify-between"
						: "carousel-actions justify-center md:flex-row md:justify-end mt-[32px] lg:mt-[34px]  "
				}
			>
				{button && button()}
				<div className={"flex gap-[24px] "}>
					<ArrowButton
						direction="left"
						variant="carousel"
						disabled={currentSlide === 0}
						onClick={handlePrev}
					/>
					<ArrowButton
						direction="right"
						variant="carousel"
						disabled={currentSlide + slidesPerView >= items.length}
						onClick={handleNext}
					/>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
