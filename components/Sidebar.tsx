"use client";

import {
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  Menu,
  X,
  Clock,
  Stethoscope,
  Pill,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  dashboardType: "doctor" | "pharmacist";
}

export default function Sidebar({ dashboardType }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const roleConfig = {
    doctor: {
      title: "Doctor Portal",
      bg: "bg-gray-900",
      activeBg: "bg-blue-600",
      hoverBg: "hover:bg-gray-800",
      iconBg: "bg-blue-500",
      headingColor: "text-blue-500",
      logoIcon: Stethoscope,
    },
    pharmacist: {
      title: "Pharmacist Portal",
      bg: "bg-green-950",
      activeBg: "bg-green-700",
      hoverBg: "hover:bg-green-900",
      iconBg: "bg-green-600",
      headingColor: "text-green-500",
      logoIcon: Pill,
    },
  };

  const config = roleConfig[dashboardType];

  const menuItems = {
    doctor: [
      {
        id: "dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/doctor/dashboard",
      },
      {
        id: "queue",
        icon: Clock,
        label: "Patient Queue",
        path: "/doctor/patientsQueue",
      },
      {
        id: "create-prescription",
        icon: Plus,
        label: "Create Prescription",
        path: "/doctor/prescriptions/create",
      },
      {
        id: "patient-records",
        icon: Users,
        label: "Patient Records",
        path: "/doctor/patients",
      },
      {
        id: "prescription-history",
        icon: FileText,
        label: "Prescription History",
        path: "/doctor/prescriptions/history",
      },
      {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/doctor/settings",
      },
    ],
    pharmacist: [
      {
        id: "dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/pharmacist/dashboard",
      },
      {
        id: "dispense",
        icon: Clock,
        label: "Dispense Medicine",
        path: "/pharmacist/dispensing",
      },
      {
        id: "inventory",
        icon: Plus,
        label: "Inventory",
        path: "/pharmacist/Inventory",
      },
      {
        id: "report",
        icon: FileText,
        label: "Dispensed Record",
        path: "/pharmacist/report",
      },
      {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/pharmacist/settings",
      },
    ],
  };

  const currentMenu = menuItems[dashboardType];
  const LogoIcon = config.logoIcon;

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    router.push('/my-account/login')
  }

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 p-6 text-white transform transition-transform duration-300 ease-in-out
          ${config.bg}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-8 h-8 ${config.iconBg} rounded-lg flex items-center justify-center`}
            >
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${config.headingColor}`}>
              MedEase
            </h1>
          </div>

          <p className="text-sm ml-11 text-gray-400">{config.title}</p>
          <hr className="border-gray-700 mt-4" />
        </div>

        <nav className="space-y-2">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? `${config.activeBg} text-white`
                  : `text-gray-300 ${config.hoverBg} hover:text-white`
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className={`w-full text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-300 ${config.hoverBg} hover:text-white`}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
