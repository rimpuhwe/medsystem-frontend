import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 sm:p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[250px] sm:min-h-[280px]" style={{boxShadow: '-3px 0 0 #E8ECED'}}>
      <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
      <h3 className="font-semibold mb-3 text-blue-500 text-sm sm:text-base lg:text-lg">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}