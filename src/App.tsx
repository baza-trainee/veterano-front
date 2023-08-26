import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutUs } from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs.tsx";
import HomePage from "./pages/HomePage.tsx";
import "./App.css";
import CookiesPanel from "./components/Cookies/CookiesPanel.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import AdminLayout from "./Layout/AdminLayout.tsx";
import ProjectsPage from "./pages/admin/ProjectsPage/ProjectsPage.tsx";
import AddProjectPage from "./pages/admin/ProjectsPage/AddProjectPage.tsx";
import EditProjectPage from "./pages/admin/ProjectsPage/EditProjectPage.tsx";


function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/contact" element={<ContactUs />} />
						<Route path="/aboutus" element={<AboutUs />} />
						<Route path="/search" element={<SearchResults />} />
						<Route path="*" element={<ErrorPage />} />
					</Route>
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="projects" element={<ProjectsPage />} />
						<Route path="projects/new-project" element={<AddProjectPage />} />
						<Route path="projects/edit-project/:id" element={<EditProjectPage />} />
					</Route>
					<Route path="/auth">
						<Route path="login" element={<LoginPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<CookiesPanel />
		</>
	);
}

export default App;
