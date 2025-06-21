import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // optional: use heroicons/lucide

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-5 w-full z-50 transition-transform duration-500 ease-in-out
 ${showNavbar ? 'translate-y-0' : '-translate-y-[100%]'}
      }`}
    >
      <div className="max-w-xl mx-auto flex items-center justify-between">
    

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 bg-gray-100 px-15 py-6 rounded-full shadow-inner">
          <a href="/" className="text-gray-700 hover:text-indigo-900 transition font-medium">Home</a>
          <a href="features" className="text-gray-700 hover:text-indigo-900 transition font-medium">Features</a>
          <a href="learn" className="text-gray-700 hover:text-indigo-900 transition font-medium">Learn</a>
          <a href="code-convertor" className="text-gray-700 hover:text-indigo-900 transition font-medium"> Convert</a>
          <a href="help" className="text-gray-700 hover:text-indigo-600 transition font-medium">Help</a>
        </div>


        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-gray-100 rounded-xl shadow px-6 py-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-indigo-600 transition">Home</a>
          <a href="#features" className="block text-gray-700 hover:text-indigo-600 transition">Features</a>
          <a href="#learn" className="block text-gray-700 hover:text-indigo-600 transition">Learn</a>
          <a href="#testimonials" className="block text-gray-700 hover:text-indigo-600 transition">Testimonials</a>
          <a href="#contact" className="block text-gray-700 hover:text-indigo-600 transition">Contact</a>
          <hr />
          <button className="w-full bg-indigo-600 text-white rounded-full py-2 font-semibold">Login</button>
          <button className="w-full bg-green-500 text-white rounded-full py-2 font-semibold">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
