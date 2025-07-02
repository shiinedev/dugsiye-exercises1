import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import App from "@/App";



export const router = createBrowserRouter([

    {
        path:"/",
        element:<App />,
        children:[
            {
                index:true,
                element:<Home />
            },
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            },
            {
                path:"/profile",
                element:<ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            },
             {
                path:"/dashboard",
                element: <ProtectedRoute>
                    <Dashboard />
                    </ProtectedRoute>
            },
            {
                path:"/admin/dashboard",
                element:<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>
            }
        ]
    }
])