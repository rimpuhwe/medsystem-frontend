"use client"

import { User, MapPin, Phone, Mail, Award, Building } from "lucide-react";
import { useState, useEffect } from "react";

export default function PharmacistProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    license: '',
    specialization: '',
    bio: ''
  });
  
  const [pharmacyData, setPharmacyData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    license: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('pharmacistProfile');
    const savedPharmacy = localStorage.getItem('pharmacyInfo');
    
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      const defaultProfile = {
        fullName: 'Ineza Ghyslaine',
        email: 'ineza.ghyslaine@pharmacy.com',
        phone: '078 234-5678',
        license: 'PH-87654321',
        specialization: 'Clinical Pharmacy',
        bio: 'Licensed pharmacist with expertise in medication management and patient counseling.'
      };
      setProfileData(defaultProfile);
      localStorage.setItem('pharmacistProfile', JSON.stringify(defaultProfile));
    }
    
    if (savedPharmacy) {
      setPharmacyData(JSON.parse(savedPharmacy));
    } else {
      setPharmacyData({
        name: 'Ubwiza Pharmacy',
        address: '456 Medical Plaza, Healthcare District, NY 10002',
        phone: '+1 (555) 876-5432',
        email: 'info@ubwizapharmacy.com',
        license: 'PL-12345678'
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Pharmacist Profile</h1>
        <p className="text-gray-600">Your professional information and pharmacy details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {(() => {
                  const fullName = profileData.fullName || '';
                  const initials = fullName.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase();
                  return initials || 'SJ';
                })()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{profileData.fullName}</h2>
            <p className="text-green-600 font-medium mb-4">{profileData.specialization}</p>
            <p className="text-gray-600 text-sm">{profileData.bio}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Pharmacy License</p>
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
              <Building className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Pharmacy Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pharmacy Name</p>
                <p className="text-gray-900 font-medium">{pharmacyData.name}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-gray-900">{pharmacyData.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pharmacy Phone</p>
                    <p className="text-gray-900">{pharmacyData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pharmacy Email</p>
                    <p className="text-gray-900">{pharmacyData.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Facility License</p>
                  <p className="text-gray-900">{pharmacyData.license}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
