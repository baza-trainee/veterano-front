import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutUs } from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs.tsx";
import HomePage from "./pages/HomePage.tsx";
import "./App.css";
import CookiesPanel from "./components/Cookies/CookiesPanel.tsx";
import SearchResults from "./pages/SearchResults.tsx";

function App() {

	return (
		<>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/contact" element={<ContactUs />} />
						<Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
						<Route path="/search" element={<SearchResults />} />
            <Route path="/aboutus" element={<AboutUs />} />
						<Route path="*" element={<ErrorPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<CookiesPanel />

		</>
	);
}

export default App;
