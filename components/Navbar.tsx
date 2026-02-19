import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/FAQ", label: "FAQ" },
  { href: "/my-account", label: "My Account" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="w-full flex items-center justify-between px-8 py-4 bg-sidebar border-b border-sidebar-border shadow-sm"
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
      <div className="flex gap-6 text-base font-medium">
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
      </div>
    </motion.nav>
  );
}
