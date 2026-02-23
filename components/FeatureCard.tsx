import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.04,
        boxShadow: "0 8px 32px 0 rgba(34,197,94,0.10)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center shadow-sm min-h-[260px]"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
