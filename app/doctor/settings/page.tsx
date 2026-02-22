"use client";

import { FileText, Key, Save, Shield, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../../components/Toast";

function SettingsPage() {
  const { showSuccess, showError, showInfo, toasts, removeToast } = useToast();
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    license: '',
    specialization: '',
    bio: ''
  });
  
  const [clinicData, setClinicData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    license: ''
  });

  const saveProfile = () => {
    localStorage.setItem('doctorProfile', JSON.stringify(profileData));
    showSuccess('Profile saved successfully!');
  };

  const saveClinic = () => {
    localStorage.setItem('clinicInfo', JSON.stringify(clinicData));
    showSuccess('Clinic information saved successfully!');
  };

  const updatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Please fill in all password fields.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showError('New password and confirmation do not match.');
      return;
    }
    
    const savedPassword = localStorage.getItem('userPassword');
    
    if (!savedPassword) {
      showError('No password set. Please contact administrator to set initial password.');
      return;
    }
    
    if (savedPassword !== currentPassword) {
      showError('Current password is incorrect.');
      return;
    }
    
    localStorage.setItem('userPassword', newPassword);
    localStorage.setItem('securitySettings', JSON.stringify({ is2FAEnabled }));
    showSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const saveSecurity = () => {
    localStorage.setItem('securitySettings', JSON.stringify({ is2FAEnabled }));
    showSuccess('Security settings saved successfully!');
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    const savedClinic = localStorage.getItem('clinicInfo');
    const savedSecurity = localStorage.getItem('securitySettings');
    
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Failed to parse profile data:', error);
        localStorage.removeItem('doctorProfile');
      }
    }
    
    if (!savedProfile) {
      setProfileData({
        fullName: 'Dr. John Smith',
        email: 'john.smith@hospital.com',
        phone: '+1 (555) 123-4567',
        license: 'MD-12345678',
        specialization: 'Internal Medicine',
        bio: ''
      });
    }
    
    if (savedClinic) {
      try {
        setClinicData(JSON.parse(savedClinic));
      } catch (error) {
        console.error('Failed to parse clinic data:', error);
        localStorage.removeItem('clinicInfo');
      }
    }
    
    if (!savedClinic) {
      setClinicData({
        name: 'City Medical Center',
        address: '123 Healthcare Ave, Medical District, NY 10001',
        phone: '+1 (555) 987-6543',
        email: 'info@citymedical.com',
        license: 'CL-98765432'
      });
    }
    
    if (savedSecurity) {
      try {
        setIs2FAEnabled(JSON.parse(savedSecurity).is2FAEnabled);
      } catch (error) {
        console.error('Failed to parse security settings:', error);
        localStorage.removeItem('securitySettings');
      }
    }
  }, []);

  return (
    <>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile, clinic information and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-600">Update your personal and professional information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical License</label>
                <input
                  type="text"
                  value={profileData.license}
                  onChange={(e) => setProfileData({...profileData, license: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                value={profileData.specialization}
                onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                placeholder="e.g., Internal Medicine"
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Brief description of your professional background"
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
            
            <button 
              onClick={saveProfile}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Profile Changes
            </button>
          </div>
        </div>
        
        {/* Clinic Information */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Clinic Information</h2>
              <p className="text-sm text-gray-600">Manage your clinic or hospital details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic/Hospital Name</label>
              <input
                type="text"
                value={clinicData.name}
                onChange={(e) => setClinicData({...clinicData, name: e.target.value})}
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={clinicData.address}
                onChange={(e) => setClinicData({...clinicData, address: e.target.value})}
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={clinicData.phone}
                  onChange={(e) => setClinicData({...clinicData, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={clinicData.email}
                  onChange={(e) => setClinicData({...clinicData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility License</label>
              <input
                type="text"
                value={clinicData.license}
                onChange={(e) => setClinicData({...clinicData, license: e.target.value})}
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button 
              onClick={saveClinic}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Clinic Changes
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>
            <p className="text-sm text-gray-600">Manage your account security settings</p>
          </div>
        </div>

        {/* 2FA Toggle */}
        <div className="flex items-center justify-between py-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Key className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Two-Factor Authentication</span>
            </div>
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={is2FAEnabled}
              onChange={(e) => {
                setIs2FAEnabled(e.target.checked);
                localStorage.setItem('securitySettings', JSON.stringify({ is2FAEnabled: e.target.checked }));
              }}
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        {/* Password Change */}
        <div className="py-6">
          <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            onClick={updatePassword}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <Key className="w-5 h-5" />
            Update Password
          </button>
        </div>
      </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
export default SettingsPage;