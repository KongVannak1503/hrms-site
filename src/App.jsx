import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import TestModal from "./routes/analytics/TextModal";
import LoginPage from "./routes/auth/LoginPage";
import Department from "./routes/department/Department";
import DepartmentCreate from "./routes/department/DepartmentForm";
import DepartmentUpdate from "./routes/department/DepartmentUpdate";

function App() {
    const router = createBrowserRouter([
        {
            path: "/login", // Separate route for login
            element: <LoginPage />, // Render LoginPage directly
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "department",
                    element: <Department />,
                },
                {
                    path: "department-update",
                    element: <DepartmentUpdate />,
                },
                {
                    path: "department-create",
                    element: <DepartmentCreate />,
                },
                {
                    path: "analytics",
                    element: <TestModal />,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "customers",
                    element: <h1 className="title">Customers</h1>,
                },
                {
                    path: "new-customer",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "products",
                    element: <h1 className="title">Products</h1>,
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
