import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as MTNavbar, Button, Typography } from "@material-tailwind/react";

export function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // <-- Remove token
    navigate("/sign-in"); // <-- Redirect to sign-in page
  };

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            Your Brand
          </Typography>
        </Link>
        
        {!token ? (<div className="flex gap-2">
          <Button 
            variant="gradient" 
            size="sm"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
          <Button 
            variant="gradient" 
            size="sm"
            onClick={() => navigate('/sign-up')}
          >
            Sign Up
          </Button>
        </div>) : (
          <Button 
            variant="gradient" 
            size="sm"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        )}
      </div>
    </MTNavbar>
  );
}

export default Navbar;