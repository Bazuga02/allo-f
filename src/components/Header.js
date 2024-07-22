import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-neutral-900 text-white p-4 w-full">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold flex items-center"
        >
          <span className="font-merienda mr-2 text-green-500 text-2xl sm:text-3xl">
            ALLO
          </span>
          <span className="hidden sm:inline">Airline Meals</span>
        </Link>

        <button className="sm:hidden text-white" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:block w-full sm:w-auto mt-4 sm:mt-0`}
        >
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-green-500 text-white font-merienda font-bold px-8 py-2 rounded-md hover:bg-white hover:text-green-500 hover:scale-105 transition-all duration-200"
            >
              Logout
            </button>
          ) : isLoginPage ? (
            <Link
              to="/"
              className="w-full sm:w-auto block text-center bg-green-500 text-white font-merienda font-bold px-8 py-2 rounded-md hover:bg-white hover:text-green-500 hover:scale-105 transition-all duration-200"
            >
              Home
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-full sm:w-auto block text-center bg-green-500 text-white font-merienda font-bold px-8 py-2 rounded-md hover:bg-white hover:text-green-500 hover:scale-105 transition-all duration-200"
            >
              Login/Signup
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
