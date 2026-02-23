"use client"

import { User, MapPin, Phone, Mail, Award, Building } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
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

  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    const savedClinic = localStorage.getItem('clinicInfo');
    
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      setProfileData({
        fullName: 'Dr. John Smith',
        email: 'john.smith@hospital.com',
        phone: '+1 (555) 123-4567',
        license: 'MD-12345678',
        specialization: 'Internal Medicine',
        bio: 'Experienced physician with over 10 years in internal medicine.'
      });
    }
    
    if (savedClinic) {
      setClinicData(JSON.parse(savedClinic));
    } else {
      setClinicData({
        name: 'City Medical Center',
        address: '123 Healthcare Ave, Medical District, NY 10001',
        phone: '+1 (555) 987-6543',
        email: 'info@citymedical.com',
        license: 'CL-98765432'
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Doctor Profile</h1>
        <p className="text-gray-600">Your professional information and clinic details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {(() => {
                  const fullName = profileData.fullName || '';
                  const initials = fullName.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase();
                  return initials || 'DS';
                })()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{profileData.fullName}</h2>
            <p className="text-blue-600 font-medium mb-4">{profileData.specialization}</p>
            <p className="text-gray-600 text-sm">{profileData.bio}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-gray-900">{profileData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Medical License</p>
                  <p className="text-gray-900">{profileData.license}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Specialization</p>
                  <p className="text-gray-900">{profileData.specialization}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Clinic Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Clinic Name</p>
                <p className="text-gray-900 font-medium">{clinicData.name}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-gray-900">{clinicData.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clinic Phone</p>
                    <p className="text-gray-900">{clinicData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clinic Email</p>
                    <p className="text-gray-900">{clinicData.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Facility License</p>
                  <p className="text-gray-900">{clinicData.license}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}