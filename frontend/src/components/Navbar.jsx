import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const location = useLocation();
  const { user, signOut } = useAuth();
  const [planName] = useState("free");

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".services-dropdown")) {
        setServicesOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const services = [
    { name: "Skill Roadmaps", path: "/learn" },
    { name: "Code Translator", path: "/code-convertor" },
    { name: "Mentor Chat", path: "/help" },
    { name: "Bug Analyzer", path: "/code-debugger" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "py-3 sm:py-4" : "py-4 sm:py-6"
      }`}
    >
      <div className="w-full flex justify-center px-4">
        <div
          className={`flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 py-3 rounded-full border transition-all duration-500 shadow-lg ${
            scrolled
              ? "glass dark:bg-black/60 bg-white/80 border-white/20 dark:border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Rocket size={20} />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Mentor<span className="text-zinc-900 dark:text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative services-dropdown">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute right-0 mt-2 w-48 glass p-2 rounded-2xl shadow-xl z-[200]">
                  {services.map((s) => (
                    <Link
                      key={s.name}
                      to={s.path}
                      onClick={() => setServicesOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-indigo-600 hover:text-white"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full p-1 h-9 w-9 sm:h-10 sm:w-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt="avatar"
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 p-2 mt-2 rounded-2xl">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User size={16} className="mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-red-500"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-indigo-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-4 left-4 right-4 md:hidden glass rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-zinc-100"
                >
                  {link.name}
                </Link>
              ))}

              <div>
                <p className="text-xs mb-2">Services</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <Link
                      key={s.name}
                      to={s.path}
                      onClick={() => setIsOpen(false)}
                      className="p-3 rounded-xl bg-zinc-100 text-center"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              {user ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-indigo-600 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign Out?"
        description="Are you sure?"
        confirmText="Sign Out"
      />
    </nav>
  );
};

export default Navbar;
