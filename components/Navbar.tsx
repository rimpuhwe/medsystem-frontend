"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { useState, useRef } from "react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/FAQ", label: "FAQ" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="w-full fixed top-0 left-0 z-30 flex items-center justify-between px-8 py-4 bg-sidebar/90 backdrop-blur border-b border-sidebar-border shadow-sm"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        className="text-2xl font-bold tracking-tight text-primary"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        MedEase
      </motion.span>
      <div className="flex gap-6 text-base font-medium items-center">
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
        {/* My Account direct link */}
        <Link
          href="/my-account/login"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none"
        >
          <User className="w-5 h-5 text-primary" />
          <span>My Account</span>
        </Link>
      </div>
    </motion.nav>
  );
}
