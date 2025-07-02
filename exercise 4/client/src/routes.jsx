import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";



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