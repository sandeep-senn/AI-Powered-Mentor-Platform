import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, LogOut, User, Settings, ChevronDown } from "lucide-react";
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
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const services = [
    { name: "Learn", path: "/learn" },
    { name: "Convert", path: "/code-convertor" },
    { name: "Chat", path: "/help" },
    { name: "Debug", path: "/code-debugger" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "py-4" : "py-6"
    }`}>
      <div className="container mx-auto px-4 flex justify-center">
        <div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full border transition-all duration-500 shadow-lg ${
            scrolled 
              ? "glass dark:bg-black/60 bg-white/80 border-white/20 dark:border-white/10" 
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
               <Rocket size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Mentor<span className="text-zinc-900 dark:text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none ${
                  services.some(s => s.path === location.pathname)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-white"
                }`}>
                  Services
                  <ChevronDown size={14} className="opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass p-2 rounded-2xl border-white/10 mt-2">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild className="p-0">
                    <Link to={service.path} className="flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors focus:bg-indigo-600 focus:text-white hover:bg-indigo-600 hover:text-white outline-none">
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="hidden md:block h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />
            
            {user ? (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-2 h-10 w-10 overflow-hidden border border-white/10">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass p-2 rounded-2xl border-white/10 mt-2">
                    <div className="px-3 py-2">
                       <p className="text-xs font-medium text-zinc-500 uppercase tracking-tighter">My Account</p>
                       <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-indigo-600 group cursor-pointer">
                       <Link to="/profile" className="flex items-center w-full">
                          <User size={16} className="mr-2 opacity-50 group-hover:opacity-100" /> Profile
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-indigo-600 group cursor-pointer">
                       <Link to="/settings" className="flex items-center w-full">
                          <Settings size={16} className="mr-2 opacity-50 group-hover:opacity-100" /> Settings
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      className="rounded-xl p-3 focus:bg-red-600 focus:text-white group text-red-500 cursor-pointer"
                      onClick={() => setShowLogoutConfirm(true)}
                    >
                       <LogOut size={16} className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full px-4 font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 font-medium">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 md:hidden glass rounded-3xl p-6 shadow-2xl z-[101]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                    location.pathname === link.path
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="px-4 py-2">
                 <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Our Services</p>
                 <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link
                        key={s.name}
                        to={s.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-white/5 bg-zinc-900/40 text-sm font-medium"
                      >
                        {s.name}
                      </Link>
                    ))}
                 </div>
              </div>

              <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800 my-1" />
              {user ? (
                 <Button onClick={handleLogout} variant="destructive" className="w-full rounded-2xl py-6">
                   Logout
                 </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-2xl py-6">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-2xl bg-indigo-600 py-6">
                      Sign Up
                    </Button>
                  </Link>
                </div>
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
        description="Are you sure you want to end your current session?"
        confirmText="Sign Out"
        variant="danger"
      />
    </nav>
  );
}
;

export default Navbar;
