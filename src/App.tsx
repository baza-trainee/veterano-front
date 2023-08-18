import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import ContactUs from "./pages/ContactUs.tsx";
import HomePage from "./pages/HomePage.tsx";
import CookiesPanel from "./components/Cookies/CookiesPanel.tsx";
import Search404 from "./components/Search404/Search404.tsx";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
						<Route path="/error" element={<Search404 />} />
						<Route path="*" element={<ErrorPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<CookiesPanel />
		</>
	);
}

export default App;
