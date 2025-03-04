import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Inventory from "./pages/Inventory";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/product/:id",
                element: <ProductPage />,
              },
            {
                path: "/inventory",
                element: (
                    <ProtectedRoute>
                        <Inventory />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router