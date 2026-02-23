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
// Types & Configs (unchanged)
// ────────────────────────────────────────────────
type Role = "patient" | "doctor" | "pharmacist";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const roleConfigs: Record<Role, { heroImage: string; tagline: string; color: "blue" | "emerald" | "purple"; bgClass: string; textClass: string }> = {
  patient: { heroImage: "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png", tagline: "Simple steps to access care, join queues, and manage your health digitally.", color: "blue", bgClass: "bg-blue-600", textClass: "text-blue-600" },
  doctor: { heroImage: "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771838200/Healthcare_Facility_Enhances_Data_Security_with_MDM_clfckr.jpg", tagline: "Streamlined workflow from verification to consultation and record keeping.", color: "emerald", bgClass: "bg-emerald-600", textClass: "text-emerald-600" },
  pharmacist: { heroImage: "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png", tagline: "Efficient dispensing, inventory management, and activity tracking in one place.", color: "purple", bgClass: "bg-purple-600", textClass: "text-purple-600" },
};

const roleSteps: Record<Role, Step[]> = {
  patient: [
    { title: "Register Your Account", description: "Sign up with your details to create a personal profile in the system.", icon: <User className="w-9 h-9" /> },
    { title: "View Dashboard & Profile", description: "Access your dashboard to see your profile, medical history, and available services.", icon: <ClipboardList className="w-9 h-9" /> },
    { title: "Join the Queue", description: "Select the service you need and join the real-time waiting queue.", icon: <Clock className="w-9 h-9" /> },
    { title: "Receive Real-time Notifications", description: "Get live updates on your queue position and when your prescription is ready.", icon: <Bell className="w-9 h-9" /> },
    { title: "Request Medical Reports", description: "Anytime you need them, request and download your medical reports directly from the app.", icon: <FileText className="w-9 h-9" /> },
  ],
  doctor: [
    { title: "Registered by Hospital Admin", description: "Your account is created and activated by the hospital administrator.", icon: <User className="w-9 h-9" /> },
    { title: "Validate Your Email", description: "Confirm your email address to fully activate your doctor account.", icon: <MailCheck className="w-9 h-9" /> },
    { title: "View Patients in Your Queue", description: "See real-time list of patients waiting for your specific service.", icon: <Clock className="w-9 h-9" /> },
    { title: "Access Patient Info", description: "View complete patient details using their unique reference number.", icon: <ClipboardList className="w-9 h-9" /> },
    { title: "Consult, Diagnose & Prescribe", description: "Perform consultation, make diagnosis, and issue digital prescriptions.", icon: <Stethoscope className="w-9 h-9" /> },
    { title: "Keep Records of Served Patients", description: "All consultations and prescriptions are automatically saved for future reference.", icon: <CheckCircle className="w-9 h-9" /> },
  ],
  pharmacist: [
    { title: "Register Your Account", description: "Create your pharmacist/pharmacy account to access the system.", icon: <User className="w-9 h-9" /> },
    { title: "View All System Activities", description: "Monitor incoming prescriptions, dispensing history, and other actions.", icon: <Activity className="w-9 h-9" /> },
    { title: "Dispense Medicine", description: "Scan QR code or enter patient reference number to dispense medication.", icon: <QrCode className="w-9 h-9" /> },
    { title: "Keep Dispensed Records", description: "System automatically logs every dispensed item with timestamp and details.", icon: <ClipboardList className="w-9 h-9" /> },
    { title: "Manage Inventory Stock", description: "Add, update, and track medication stock levels in real time.", icon: <Package className="w-9 h-9" /> },
  ],
};

// RoleSelector component remains unchanged
function RoleSelector({ selected, onSelect }: { selected: Role; onSelect: (role: Role) => void }) {
  const roles: Role[] = ["patient", "doctor", "pharmacist"];
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-10 px-4">
      {roles.map((role) => {
        const isActive = selected === role;
        const { bgClass } = roleConfigs[role];
        return (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className={`px-7 py-3.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg ${
              isActive ? `${bgClass} text-white scale-105 ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-950` : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────
// Main Page – Fixed version
// ────────────────────────────────────────────────
export default function HowItWorksPage() {
  const [role, setRole] = useState<Role>("patient");
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const currentSteps = roleSteps[role] ?? [];
  const config = roleConfigs[role];

  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset visibility + refs when role changes
    setVisibleSteps([0, 1]);
    stepRefs.current.clear();

    // Disconnect old observer
    observer.current?.disconnect();

    // New observer
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index) && !visibleSteps.includes(index)) {
              setVisibleSteps((prev) => [...new Set([...prev, index])]);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    // Observe after render
    const timer = setTimeout(() => {
      stepRefs.current.forEach((el) => el && observer.current?.observe(el));
    }, 150);

    return () => {
      observer.current?.disconnect();
      clearTimeout(timer);
    };
  }, [role]); // ← ONLY role – this prevents infinite loop

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full h-[360px] md:h-[480px] overflow-hidden">
        {config.heroImage && (
          <Image src={config.heroImage} alt={`${role} experience`} fill className="object-cover brightness-[0.65]" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-xl">How It Works</h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-90">{config.tagline}</p>
        </div>
      </div>

      <RoleSelector selected={role} onSelect={setRole} />

      {/* Steps */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="space-y-12 md:space-y-16">
          {currentSteps.map((step, idx) => (
            <div
              key={`${role}-${idx}`}
              data-index={idx}
              ref={(node) => {
                if (node) stepRefs.current.set(idx, node);
                else stepRefs.current.delete(idx);
              }}
              className={`transition-all duration-800 ease-out transform ${
                visibleSteps.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <div className="flex items-start gap-6 bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className={`${config.bgClass} p-4 rounded-xl text-white flex-shrink-0`}>{step.icon}</div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 ${config.textClass}`}>{step.title}</h3>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
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