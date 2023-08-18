import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.tsx";

export const Layout = () => {
	return (
		<div>
			<ScrollToTop />
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
