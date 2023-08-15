import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex-grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
