import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/40 shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
        <div className="bg-primary/10 rounded-lg p-2 animate-float">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary w-5 h-5"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
          <span className="font-semibold text-lg tracking-tight">
            ParkSmart
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" active={location.pathname === "/"} label="Generate Ticket" />
          <NavLink to="/about" active={location.pathname === "/about"} label="About" />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

// Navigation Link Component
const NavLink = ({ to, active, label }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`py-1 relative text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-slide-in-right" />
      )}
    </button>
  );
};

export default Navbar;
