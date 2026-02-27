"use client"

import { Plus, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../../components/Toast";

function AddPatient() {
  const { showSuccess, showError, showInfo, toasts, removeToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    emergencyPhone: '',
    gender: '',
    insuranceProvider: '',
    insuranceNumber: '',
    insuranceHolder: '',
    holderEmployer: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Try API first
      const token = localStorage.getItem('token');
      if (token && !token.startsWith('local_')) {
        const response = await fetch('https://medsystemapplication.onrender.com/api/doctor/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          const data = await response.json();
          showSuccess(`Patient ${formData.fullName} saved successfully!`);
          setFormData({
            fullName: '', dateOfBirth: '', phoneNumber: '', emergencyPhone: '',
            gender: '', insuranceProvider: '', insuranceNumber: '', insuranceHolder: '', holderEmployer: '', email: ''
          });
          return;
        }
      }
    } catch (error) {
      console.log('API failed, using localStorage');
    }
    
    // Fallback to localStorage
    const patientId = `PAT-${Date.now().toString().slice(-6)}`;
    const patientData = {
      id: patientId,
      name: formData.fullName,
      gender: formData.gender,
      phone: formData.phoneNumber,
      email: formData.email || `${formData.fullName.toLowerCase().replace(' ', '.')}@email.com`,
      lastVisit: new Date().toLocaleDateString(),
      prescriptions: 0
    };
    
    const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    existingPatients.push(patientData);
    localStorage.setItem('patients', JSON.stringify(existingPatients));
    
    showSuccess(`Patient ${formData.fullName} saved successfully with ID: ${patientId}`);
    setFormData({
      fullName: '', dateOfBirth: '', phoneNumber: '', emergencyPhone: '',
      gender: '', insuranceProvider: '', insuranceNumber: '', insuranceHolder: '', holderEmployer: '', email: ''
    });
  };

  return (
    <>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Add New Patient</h1>
        <p className="text-gray-600">Register a new patient in the system</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl ">
        <div className="card ">
          <div className="mb-6 ">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Information</h2>
            <p className="text-sm text-gray-600">Enter the patient's personal and medical information</p>
          </div>

          {/* Personal Information Section */}
          <div className="mb-8 shadow-2xl rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-900">
              Personal Information
              <Plus className="w-5 h-5 text-blue-600" />
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter patient's full name"
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Emergency contact number"
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                 <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
              </div>
            </div>
          </div>

          {/* insurance details Section */}
          <div className="shadow-2xl rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-900">
              Insurance Details
              <Plus className="w-5 h-5 text-blue-600" />
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                  <select
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Provider</option>
                    <option value="rssb">RSSB</option>
                    <option value="mmi">MMI</option>
                    <option value="radiant">RADIANT</option>
                    <option value="britam">BRITAM</option>
                  </select>
                </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Number</label>
                <input
                  type="text"
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleInputChange}
                  placeholder="Enter insurance number"
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Holder</label>
                <input
                  type="text"
                  name="insuranceHolder"
                  value={formData.insuranceHolder}
                  onChange={handleInputChange}
                  placeholder="Enter insurance holder name"
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Holder Employer</label>
                <input
                  type="text"
                  name="holderEmployer"
                  value={formData.holderEmployer}
                  onChange={handleInputChange}
                  placeholder="Enter holder employer"
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary text-white bg-blue-500 p-3 rounded-lg flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Patient
            </button>
          </div>
        </div>
      </form>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  );
}

export default AddPatient;

