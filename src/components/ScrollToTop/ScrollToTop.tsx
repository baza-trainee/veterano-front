import { useEffect, useState } from "react";

const ScrollToTop = () => {
	const [visible, setVisible] = useState(false);

	const checkVisibility = () => {
		if (window.scrollY > 300) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", checkVisibility);
		return () => window.removeEventListener("scroll", checkVisibility);
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className="scroll-to-top flex items-center justify-center"
			style={{ display: visible ? "flex" : "none" }}
		>
			<div className="w-[48px] h-[48px] scroll-to-top-icon">
				<svg
					className="scrollToTopIcon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 48 48"
					fill="#151515"
				>
					<path d="M14.1 37.75L12 35.65L24 23.65L36 35.65L33.9 37.75L24 27.85L14.1 37.75ZM14.1 25.1L12 23L24 11L36 23L33.9 25.1L24 15.2L14.1 25.1Z"></path>
				</svg>
			</div>
		</button>
	);
};

export default ScrollToTop;
