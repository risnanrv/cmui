"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "./AuthModal";

type ProfileModalProps = {
  user: { name: string; email: string; image: string };
  onClose: () => void;
  onSave: (data: { name: string; password: string }) => void;
};

const ProfileModal = ({ user, onClose, onSave }: ProfileModalProps) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-[#4459ff]">
            <img
              src={user.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4459ff]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4459ff]"
              placeholder="Enter new password"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({ name, password })}
              className="px-4 py-2 bg-[#4459ff] text-white rounded-md hover:bg-[#3a4bd6] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Mock user data - replace with your actual user data
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  });

  const pathname = usePathname();
  const isScrolled = typeof window !== 'undefined' ? window.scrollY > 10 : false;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Daily Task", path: "/daily-task" },
    { name: "Testnet", path: "/testnet" },
    { name: "Tutorial", path: "/tutorial" },
  ];

  const handleProfileSave = (updatedData: { name: string; password: string }) => {
    // Handle profile update logic here
    setUser({
      ...user,
      name: updatedData.name
    });
    setIsProfileModalOpen(false);
  };

  return (
    <header
      className={`fixed rounded-b-md w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-[#4459ff]/90 backdrop-blur-md shadow-sm"
          : "py-4 bg-[#4459ff]"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link
                href="/"
                className="lg:mr-10 mx-auto lg:mx-0 flex items-center space-x-2"
              >
                <span className="text-2xl font-bold text-white">Logo</span>
              </Link>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="relative px-4 py-2 rounded-lg"
              >
                <motion.span
                  className={`block relative z-10 text-white hover:text-white transition-colors ${
                    pathname === link.path ? "font-medium" : "opacity-90"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </motion.span>
                {pathname === link.path && (
                  <motion.div
                    layoutId="activeNavItem"
                    className="absolute inset-0 bg-white/20 rounded-lg border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Profile/CTA */}
          <motion.div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAuthModalOpen(true)} 
              className="text-[#4459ff] border border-[#4459ff] px-4 py-2 rounded-lg bg-white transition-all duration-200"
            >
              Sign Up
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden focus:outline-none"
              >
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiUser className="mr-2" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        // Handle logout logic here
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-1 pt-2 pb-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      className={`px-2 py-1 rounded-lg transition-all ${
                        pathname === link.path
                          ? "bg-white/20 border border-white/30"
                          : "hover:bg-white/10"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-white flex items-center space-x-2">
                        <span
                          className={
                            pathname === link.path ? "font-medium" : ""
                          }
                        >
                          {link.name}
                        </span>
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <ProfileModal
            user={user}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={handleProfileSave}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;