import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";

export function TagIcons({
  tag,
  color = "#22c55e",
}: {
  tag: string;
  color?: string;
}) {
  if (tag === "MOH Certified")
    return (
      <BadgeCheck
        className="w-5 h-5"
        aria-label="MOH Certified"
        color={color}
      />
    );
  if (tag === "HIPAA Compliant")
    return (
      <ShieldCheck
        className="w-5 h-5"
        aria-label="HIPAA Compliant"
        color={color}
      />
    );
  if (tag === "24/7 Available")
    return (
      <Clock className="w-5 h-5" aria-label="24/7 Available" color={color} />
    );
  return null;
}
