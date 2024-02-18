import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Messages", path: "/messages" },
    { name: "Matches", path: "/matches" },
    { name: "Settings", path: "/settings" },
  ];

  const sidebarVariants = {
    open: { opacity: 1, x: 0, transition: { stiffness: 300, damping: 30 } },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { stiffness: 300, damping: 30 },
    },
  };

  return (
    <nav className="bg-transparent relative z-50 w-full">
      <motion.div
        className="container mx-auto px-6 py-4 md:py-6 text-center items-center flex justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-white text-lg tracking-wide">
                Sugr
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} text={link.name} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="outline-none mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose size={28} className="text-white" />
            ) : (
              <AiOutlineMenu size={28} className="text-white" />
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden  p-4 rounded-lg absolute inset-x-4 top-full mt-2 bg-[#16161b] shadow-lg"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} text={link.name} mobile />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, text, mobile }) => (
  <Link
    to={to}
    className={`block py-2 px-4 text-sm ${
      mobile ? "text-white" : "text-gray-200 hover:text-gray-400"
    } font-medium ${
      mobile ? "mb-2 last:mb-0" : ""
    } transition duration-300 ease-in-out transform hover:scale-105`}
  >
    {text}
  </Link>
);

export default Navbar;
