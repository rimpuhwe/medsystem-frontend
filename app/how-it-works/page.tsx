
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  ClipboardList,
  Clock,
  Bell,
  FileText,
  Stethoscope,
  CheckCircle,
  MailCheck,
  Activity,
  QrCode,
  Package,
} from "lucide-react";

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
type Role = "patient" | "doctor" | "pharmacist";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

// ────────────────────────────────────────────────
// Role Configurations
// ────────────────────────────────────────────────
const roleConfigs: Record<
  Role,
  {
    heroImage: string;
    tagline: string;
    description: string;
    bgClass: string;
    textClass: string;
  }
> = {
  patient: {
    heroImage:
      "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png",
    tagline:
      "Simple steps to access care, join queues, and manage your health digitally.",
    description:
      "Patients can digitally join queues, access prescriptions, and manage their health records in real time.",
    bgClass: "bg-blue-600",
    textClass: "text-blue-600",
  },
  doctor: {
    heroImage:
      "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771838200/Healthcare_Facility_Enhances_Data_Security_with_MDM_clfckr.jpg",
    tagline:
      "Streamlined workflow from verification to consultation and record keeping.",
    description:
      "Doctors can consult patients, issue digital prescriptions, and securely manage medical records.",
    bgClass: "bg-teal-600",
    textClass: "text-teal-600",
  },
  pharmacist: {
    heroImage:
      "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png",
    tagline:
      "Efficient dispensing, inventory management, and activity tracking in one place.",
    description:
      "Pharmacists can verify prescriptions, dispense medication, and track inventory efficiently.",
    bgClass: "bg-green-600",
    textClass: "text-green-600",
  },
};

// ────────────────────────────────────────────────
// Steps
// ────────────────────────────────────────────────
const roleSteps: Record<Role, Step[]> = {
  patient: [
    {
      title: "Register Your Account",
      description:
        "Sign up with your details to create a personal profile in the system.",
      icon: <User className="w-8 h-8" />,
    },
    {
      title: "Join the Queue",
      description:
        "Select the service you need and join the real-time waiting queue.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      title: "Receive Notifications",
      description:
        "Get live updates when it’s your turn or when your prescription is ready.",
      icon: <Bell className="w-8 h-8" />,
    },
    {
      title: "Download Reports",
      description:
        "Request and download medical reports anytime from your dashboard.",
      icon: <FileText className="w-8 h-8" />,
    },
  ],
  doctor: [
    {
      title: "Account Activation",
      description:
        "Hospital admin registers your account and activates your profile.",
      icon: <MailCheck className="w-8 h-8" />,
    },
    {
      title: "View Patient Queue",
      description:
        "Access the real-time list of patients waiting for consultation.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      title: "Consult & Prescribe",
      description:
        "Diagnose patients and issue digital prescriptions securely.",
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      title: "Save Medical Records",
      description:
        "All consultations are automatically stored for future reference.",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ],
  pharmacist: [
    {
      title: "Access Prescriptions",
      description:
        "View all incoming prescriptions instantly in your dashboard.",
      icon: <Activity className="w-8 h-8" />,
    },
    {
      title: "Scan & Dispense",
      description:
        "Scan QR code or enter reference number to dispense medication.",
      icon: <QrCode className="w-8 h-8" />,
    },
    {
      title: "Log Dispensing",
      description:
        "Each dispensed medicine is automatically recorded with timestamp.",
      icon: <ClipboardList className="w-8 h-8" />,
    },
    {
      title: "Manage Inventory",
      description:
        "Track stock levels and update medication inventory in real time.",
      icon: <Package className="w-8 h-8" />,
    },
  ],
};

// ────────────────────────────────────────────────
// Role Selector Component
// ────────────────────────────────────────────────
function RoleSelector({
  selected,
  onSelect,
}: {
  selected: Role;
  onSelect: (role: Role) => void;
}) {
  const roles: Role[] = ["patient", "doctor", "pharmacist"];

  return (
    <div className="flex flex-col items-center my-10 md:my-20 px-4">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {roles.map((role) => {
          const isActive = selected === role;
          const config = roleConfigs[role];

          return (
            <button
              key={role}
              onClick={() => onSelect(role)}
              className={`px-4 py-2 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-lg transition-all duration-300 shadow-md hover:shadow-xl ${
                isActive
                  ? `${config.bgClass} text-white scale-105`
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:scale-105"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────
export default function HowItWorksPage() {
  const [role, setRole] = useState<Role>("patient");
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const currentSteps = roleSteps[role];
  const config = roleConfigs[role];

  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setVisibleSteps([0, 1]);
    setExpandedSteps([]);
    stepRefs.current.clear();
    observer.current?.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleSteps((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const timer = setTimeout(() => {
      stepRefs.current.forEach((el) => el && observer.current?.observe(el));
    }, 100);

    return () => {
      observer.current?.disconnect();
      clearTimeout(timer);
    };
  }, [role]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* FULL SCREEN HERO */}
      <div className="relative w-full h-[60vh] md:h-screen overflow-hidden">
        <Image
          src={config.heroImage}
          alt="Hero Image"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 md:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight">
            How It Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl opacity-90 mt-4">
            {config.tagline}
          </p>
        </div>
      </div>

      <RoleSelector selected={role} onSelect={setRole} />

      {/* Steps Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="space-y-6 md:space-y-14">
          {currentSteps.map((step, idx) => (
            <div
              key={`${role}-${idx}`}
              data-index={idx}
              ref={(node) => {
                if (node) {
                  stepRefs.current.set(idx, node);
                } else {
                  stepRefs.current.delete(idx);
                }
              }}
              className={`transition-all duration-700 transform ${
                visibleSteps.includes(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <div 
                className={`flex flex-col sm:flex-row items-start gap-4 md:gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  expandedSteps.includes(idx) ? 'p-4 md:p-8' : 'p-3 md:p-4'
                }`}
                onMouseEnter={() => setExpandedSteps(prev => prev.includes(idx) ? prev : [...prev, idx])}
              >
                <div className={`${config.bgClass} rounded-xl text-white transition-all duration-300 flex-shrink-0 ${
                  expandedSteps.includes(idx) ? 'p-3 md:p-4' : 'p-2 md:p-3'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold ${config.textClass} transition-all duration-300 ${
                      expandedSteps.includes(idx) ? 'text-lg md:text-2xl' : 'text-base md:text-xl'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-300 text-sm md:text-lg mt-2 md:mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSteps.includes(idx) ? 'max-h-40' : 'max-h-0'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}