import { createBrowserRouter } from "react-router-dom";

import AuthWrapper from "../components/Layout/AuthWrapper";
import { routes } from "../constants/Route";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import BaseWrapper from "../components/Layout/BaseWrapper";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminPanel from "../pages/AdminPanel";
import PublicWrapper from "../components/Layout/PublicWrapper";
import ReportPage from "../pages/ReportPage";
import GovtPanel from "../pages/GovtPanel";
import AwarenessPage from "../pages/AwarenessPage";

const MainRoutes = createBrowserRouter([
	{
		children: [
			{
				path: routes.notFound.path,
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <PublicWrapper />,
		children: [
			{
				path: routes.home.path,
				element: <HomePage />,
			},
			{
				path: routes.awareness.path,
				element: <AwarenessPage />,
			}
		],
	},
	{
		element: <AuthWrapper />,
		children: [
			{
				path: routes.login.path,
				element: <LoginPage />,
			},
			{
				path: routes.signup.path,
				element: <SignupPage />,
			},
		],
	},
	{
		element: <BaseWrapper />,
		children: [
			{
				path: routes.reportPage.path,
				element: <ReportPage />,
			},
			{
				path: routes.adminPanel.path,
				element: <AdminPanel />,
			},
			{
				path: routes.govtPanel.path,
				element: <GovtPanel />,
			},
		],
	},
]);

export default MainRoutes;
