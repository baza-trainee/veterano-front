import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 1280px)",
	});
	const isTablet = useMediaQuery({
		query: "(min-width: 768px) and (max-width: 1279px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});
	return { isDesktop, isTablet, isMobile };
};