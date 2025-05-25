"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaDiscord,FaTelegram ,FaInstagram } from "react-icons/fa";



export default function Footer() {
  const socialIcons = [
    { icon: <FaTelegram className="w-5 h-5" />, label: "Telegram" },
    { icon: <FaInstagram className="w-5 h-5" />, label: "Instagram" },
    { icon: <FaDiscord className="w-5 h-5" />, label: "Gamepad" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Testnet", href: "/testnet" },
    { name: "Daily Activity", href: "/daily-activity" },
    { name: "Tutorials", href: "/tutorials" },
  ];

  return (
    <footer className="bg-[#4459ff] text-white w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">CRYPTO MONKEY</h2>
              <p className="mt-4 text-white/90 max-w-md">
                Your Web3 Super App that brings simplicity to blockchain project management, 
                activity tracking, and educational resources.
              </p>
            </div>
            
            <div className="flex space-x-4">
              {socialIcons.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="md:justify-self-end">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-80">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-white/70">
          © 2025 Crypto Monkey. All rights reserved.
        </div>
      </div>
    </footer>
  );
}