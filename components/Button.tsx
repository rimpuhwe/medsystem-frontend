import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  href,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const base =
    variant === "primary"
      ? "px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
      : "px-6 py-3 rounded-lg border border-primary text-primary font-semibold shadow hover:bg-primary/10 transition";

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{ display: "inline-block" }}
      >
        <Link href={href} className={`${base} ${className}`}>
          {children}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.button
      className={`${base} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      type="button"
    >
      {children}
    </motion.button>
  );
}
