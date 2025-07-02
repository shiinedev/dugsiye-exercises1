import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { LayoutDashboard, LucideFileChartColumnIncreasing } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";

const Navbar = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const navigate = useNavigate();

   const { data} = useQuery({
    queryKey: "profile",
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
    retry: 1,
  });

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="w-full p-3 bg-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <LucideFileChartColumnIncreasing className="text-green-400" />
          <Link to="/" className="text-2xl">
            Finance Track
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center  space-x-2">
            <div>
              <Link to="/dashboard">
                <Button variant="outline">
                  <LayoutDashboard />
                  <span className="hidden sm:block">Dashboard</span>
                </Button>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={data?.profile} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    
                      Profile
                  
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <Button variant={"destructive"} className={"w-full"}>
                    {" "}
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center  space-x-2">
            <Link to="/login">
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
