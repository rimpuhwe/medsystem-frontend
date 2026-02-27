"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  dashboardType: "doctor" | "pharmacist";
}

export default function Header({ dashboardType }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const roleConfig = {
    doctor: {
      title: "Doctor Dashboard",
      subtitle: "Manage Prescriptions and Patient Records",
      avatarBg: "bg-blue-600",
      headingColor: "text-blue-600",
      profileKey: "doctorProfile",
      baseRoute: "/doctor",
    },
    pharmacist: {
      title: "Pharmacy Dashboard",
      subtitle: "Manage Inventory, Sales and Dispensing",
      avatarBg: "bg-green-600",
      headingColor: "text-green-600",
      profileKey: "pharmacistProfile",
      baseRoute: "/pharmacist",
    },
  };

  // Fallback config if dashboardType is missing or invalid
  const config = roleConfig[dashboardType] || {
    title: "Dashboard",
    subtitle: "Manage your workspace",
    avatarBg: "bg-gray-600",
    headingColor: "text-gray-600",
    profileKey: "userProfile",
    baseRoute: "/",
  };

  useEffect(() => {
    const updateInitials = () => {
      const savedProfile = localStorage.getItem(config.profileKey);

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.fullName) {
          const initials = profile.fullName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase();

          setUserInitials(initials);
        }
      }
    };

    updateInitials();

    // Listen for storage changes
    window.addEventListener('storage', updateInitials);
    
    // Custom event for same-tab updates
    window.addEventListener('profileUpdated', updateInitials);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('storage', updateInitials);
      window.removeEventListener('profileUpdated', updateInitials);
    };
  }, [config.profileKey]);

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/my-account/login");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="ml-12 lg:ml-0">
          <h1
            className={`text-lg lg:text-xl font-semibold ${config.headingColor}`}
          >
            {config.title}
          </h1>
          <p className="text-sm text-gray-600 hidden sm:block">
            {config.subtitle}
          </p>
        </div>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div
              className={`w-10 h-10 ${config.avatarBg} text-white rounded-full flex items-center justify-center font-medium`}
            >
              {userInitials || "U"}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  router.push(`${config.baseRoute}/profile`);
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
              >
                <User className="w-4 h-4" />
                Profile
              </button>

              <button
                onClick={() => {
                  router.push(`${config.baseRoute}/settings`);
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>

              <hr className="my-2" />

              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
