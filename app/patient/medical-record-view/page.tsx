"use client"

import { Heart, AlertTriangle, User, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

export default function MedicalRecordView() {
  const [patientData, setPatientData] = useState<any>(null)

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('https://medsystemapplication.onrender.com/api/patient', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.ok) {
            const data = await response.json()
            setPatientData(data)
          }
        } catch (error) {
          console.error('Failed to fetch patient data:', error)
        }
      }
    }
    fetchPatientData()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">Medical Record</h1>
          <p className="text-gray-600">Generated on: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Patient Information
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-semibold">{patientData?.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Reference ID:</p>
                <p className="font-semibold">{patientData?.referenceNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth:</p>
                <p className="font-semibold">{patientData?.dateOfBirth || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Insurance:</p>
                <p className="font-semibold">{patientData?.insurance || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-semibold">{patientData?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-semibold">{patientData?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-500" />
              Chronic Diseases
            </h2>
            <div className="space-y-3">
              {patientData?.chronicDiseases && patientData.chronicDiseases.length > 0 ? (
                patientData.chronicDiseases.map((disease: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{disease}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No chronic diseases recorded</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Allergies & Reactions
            </h2>
            <div className="space-y-3">
              {patientData?.allergies && patientData.allergies.length > 0 ? (
                patientData.allergies.map((allergy: string, index: number) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Allergy
                        </span>
                        <p className="font-semibold text-gray-800">{allergy}</p>
                      </div>
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No allergies recorded</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button 
            onClick={() => window.print()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-semibold"
          >
            Print Record
          </button>
        </div>
      </div>
    </div>
  )
}
