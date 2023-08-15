import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutUs } from "./pages/AboutUs";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="*" element={<ErrorPage />} />
					<Route path="/aboutus" element={<AboutUs />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
