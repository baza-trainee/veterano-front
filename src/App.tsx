import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutUs } from "./pages/AboutUs";
import HomePage from "./pages/HomePage.tsx";
import CookiesPanel from "./components/Cookies/CookiesPanel.tsx";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<ErrorPage />} />
					<Route path="/aboutus" element={<AboutUs />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
