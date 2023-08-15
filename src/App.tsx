import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import ModalWindow from "./components/Modal/ModalWindow.tsx";

function App() {
	return (

<>
	<ModalWindow/>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="*" element={<ErrorPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
</>
	);
}

export default App;
