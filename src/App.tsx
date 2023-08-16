import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import ContactUs from "./pages/ContactUs.tsx";

function App() {
	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/contact" element={<ContactUs />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
