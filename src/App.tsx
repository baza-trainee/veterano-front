import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import HomePage from "./pages/HomePage.tsx";

function App() {
	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
