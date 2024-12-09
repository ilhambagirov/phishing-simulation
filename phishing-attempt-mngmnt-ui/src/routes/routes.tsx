import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import { Dashboard } from "../pages/dashboard";

export const routes = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/dashboard", element: <Dashboard /> },
        ]
    }
])