import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutUs } from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs.tsx";
import HomePage from "./pages/HomePage.tsx";
import "./App.css";
import CookiesPanel from "./components/Cookies/CookiesPanel.tsx";
import AdminLayout from "./Layout/AdminLayout.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import PartnersPage from "./pages/admin/PartnersPage/PartnersPage.tsx";
import AddPartnerPage from "./pages/admin/PartnersPage/AddPartnerPage.tsx";
import ProjectsPage from "./pages/admin/ProjectsPage/ProjectsPage.tsx";
import AddProjectPage from "./pages/admin/ProjectsPage/AddProjectPage.tsx";
import EditProjectPage from "./pages/admin/ProjectsPage/EditProjectPage.tsx";
import { Contacts } from "./pages/adminPage/contacts/Contacts.tsx";
import { DocumentPage } from "./pages/adminPage/Document.tsx";
import ScrollToTop from "./components/ScrollToTopFunction/ScrollToTopFunction.ts";
import { PrivacyPolic } from "./ruleFiles/PrivacyPolicy.tsx";
import { TermsSite } from "./ruleFiles/TermsSite.tsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
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
						<Route path="projects/add" element={<AddProjectPage />} />
						<Route
							path="projects/edit-project/:id"
							element={<EditProjectPage />}
						/>
						<Route path="contacts" element={<Contacts />} />
						<Route path="documents" element={<DocumentPage />} />
						<Route path="partners" element={<PartnersPage />} />
						<Route path="partners/:id" element={<AddPartnerPage />} />
						<Route path="partners/add" element={<AddPartnerPage />} />
					</Route>
					<Route path="/auth">
						<Route path="login" element={<LoginPage />} />
					</Route>
					<Route path="/privacy" element={<PrivacyPolic />} />
					<Route path="/terms" element={<TermsSite />} />
				</Routes>
			</BrowserRouter>
			<CookiesPanel />
		</>
	);
}

export default App;
