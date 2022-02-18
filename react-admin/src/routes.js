import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import DashboardApp from "./pages/DashboardApp";
import Admin from "./pages/Admin";
import Category from "./pages/Category";
import AdminAdd from "./pages/AdminAdd";
import CategoryAdd from "./pages/CategoryAdd";
import AdminUpdate from "./pages/AdminUpdate";
import Books from "./pages/Books/Books";
import AddBooks from "./pages/Books/AddBook";

import Order from "./pages/Order/Order";
import Customers from "./pages/Customers/Customers";

export default function Router() {
	return useRoutes([
		{
			path: "/",
			element: <DashboardLayout />,
			children: [
				{
					element: <Navigate to="/app" replace />,
				},
				{ path: "app", element: <DashboardApp /> },
				{ path: "admin", element: <Admin /> },
				{
					path: "admin/add",
					element: <AdminAdd />,
				},
				{
					path: "admin/update/:id",
					element: <AdminUpdate />,
				},
				{
					path: "category",
					element: <Category />,
				},
				{
					path: "category/add",
					element: <CategoryAdd />,
				},

				{ path: "books", element: <Books /> },
				{ path: "books/add", element: <AddBooks /> },

				{ path: "order", element: <Order /> },
				{ path: "customers", element: <Customers /> },
			],
		},
	]);
}
