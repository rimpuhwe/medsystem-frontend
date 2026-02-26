"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, User, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/FAQ", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="w-full fixed top-0 left-0 z-30 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-sidebar/90 backdrop-blur border-b border-sidebar-border shadow-sm"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center">
          <Stethoscope className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg md:text-xl text-gray-900">MedEase</h1>
          <p className="text-xs md:text-sm text-gray-600">Rwanda Digital Health</p>
        </div>
      </div>
      <div className="flex gap-3 md:gap-6 text-sm md:text-base font-medium items-center">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.4,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            style={{ display: "inline-block" }}
            className="hidden md:inline-block"
          >
            <Link
              href={link.href}
              className="hover:text-primary transition-colors duration-200"
              style={{ display: "inline-block" }}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <Link
          href="/my-account/login"
          className="hidden md:flex items-center gap-2 px-4 py-2 ml-4 rounded-lg bg-blue-700 text-white hover:bg-blue-700/90 transition-colors focus:outline-none"
        >
          <User className="w-5 h-5 text-white" />
          My Account
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-900"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden"
          >
            <div className="flex flex-col items-center p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-900 hover:text-blue-700 py-2 transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/my-account/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-700 text-white hover:bg-blue-700/90 transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                My Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
