"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  User,
  Database,
  Settings as SettingsIcon,
} from "lucide-react";

export default function SettingsPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataRetention, setDataRetention] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    license: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('pharmacistProfile');
    if (saved) {
      setProfileData(JSON.parse(saved));
    } else {
      const defaultProfile = {
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@pharmacy.com',
        phone: '+1 (555) 234-5678',
        license: 'PH-87654321'
      };
      setProfileData(defaultProfile);
      localStorage.setItem('pharmacistProfile', JSON.stringify({...defaultProfile, specialization: 'Clinical Pharmacy', bio: 'Licensed pharmacist with expertise in medication management and patient counseling.'}));
    }
  }, []);

  const saveProfile = () => {
    const saved = localStorage.getItem('pharmacistProfile');
    const existing = saved ? JSON.parse(saved) : {};
    localStorage.setItem('pharmacistProfile', JSON.stringify({...existing, ...profileData}));
    alert('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] pb-28">
      <div className="max-w-5xl mx-auto p-8 space-y-6">

        {/* ================= Pharmacist Info ================= */}
        <SectionCard
          icon={<User size={16} className="text-green-500" />}
          title="Pharmacist Information"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Full Name" value={profileData.fullName} onChange={(v) => setProfileData({...profileData, fullName: v})} />
            <FormField label="License Number" value={profileData.license} onChange={(v) => setProfileData({...profileData, license: v})} />
            <FormField label="Phone Number" value={profileData.phone} onChange={(v) => setProfileData({...profileData, phone: v})} />
            <FormField label="Email Address" value={profileData.email} onChange={(v) => setProfileData({...profileData, email: v})} />
          </div>
          <button onClick={saveProfile} className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">Save Profile</button>
        </SectionCard>

        {/* ================= Security Settings ================= */}
        <SectionCard
          icon={<Shield size={16} className="text-yellow-500" />}
          title="Security Settings"
        >
          <div className="space-y-4 mb-6">
            <PasswordField label="Current Password" />
            <PasswordField label="New Password" />
            <PasswordField label="Confirm New Password" />
          </div>

          <p className="text-xs text-gray-500 mb-3 font-medium">
            Security Options
          </p>

          <ToggleRow
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            enabled={twoFA}
            setEnabled={setTwoFA}
          />

          <ToggleRow
            title="Session Timeout"
            description="Automatically log out after 30 minutes of inactivity"
            enabled={sessionTimeout}
            setEnabled={setSessionTimeout}
          />
        </SectionCard>

        {/* ================= System Preferences ================= */}
        <SectionCard
          icon={<SettingsIcon size={16} className="text-blue-500" />}
          title="System Preferences"
        >
          <ToggleRow
            title="Auto-refresh Dashboard"
            description="Automatically refresh data every 5 minutes"
            enabled={autoRefresh}
            setEnabled={setAutoRefresh}
          />

          <ToggleRow
            title="Sound Alerts"
            description="Play sound for important notifications"
            enabled={soundAlerts}
            setEnabled={setSoundAlerts}
          />

          <ToggleRow
            title="Compact View"
            description="Use compact layout for tables and lists"
            enabled={compactView}
            setEnabled={setCompactView}
          />

          <ToggleRow
            title="Advanced Mode"
            description="Show additional technical information"
            enabled={advancedMode}
            setEnabled={setAdvancedMode}
          />
        </SectionCard>

        {/* ================= Data Management ================= */}
        <SectionCard
          icon={<Database size={16} className="text-orange-500" />}
          title="Data Management"
        >
          <ToggleRow
            title="Automatic Backup"
            description="Backup data daily at 3:00 AM"
            enabled={autoBackup}
            setEnabled={setAutoBackup}
          />

          <ToggleRow
            title="Data Retention"
            description="Keep prescription records for 7 years"
            enabled={dataRetention}
            setEnabled={setDataRetention}
          />

          <div className="pt-4 border-t mt-4 flex gap-3">
            <button className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
              Export Data
            </button>
            <button className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
              Sync Now
            </button>
          </div>
        </SectionCard>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-4">
        <div className="max-w-5xl mx-auto flex justify-end gap-4">
          <button className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}






/* ================= Reusable Components ================= */

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function PasswordField({ label }: { label: string }) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">
        {label}
      </label>
      <input
        type="password"
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  setEnabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="text-sm font-medium text-gray-700">
          {title}
        </p>
        <p className="text-xs text-gray-500">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}