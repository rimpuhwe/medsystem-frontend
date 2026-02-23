"use client"

import { Heart, AlertTriangle, User, Calendar } from "lucide-react"

export default function MedicalRecordView() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">Medical Record</h1>
          <p className="text-gray-600">Generated on: January 15, 2024</p>
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
                <p className="font-semibold">&lt;name&gt;</p>
              </div>
              <div>
                <p className="text-gray-600">Reference ID:</p>
                <p className="font-semibold">&lt;reference_id&gt;</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth:</p>
                <p className="font-semibold">&lt;date_of_birth&gt;</p>
              </div>
              <div>
                <p className="text-gray-600">Insurance:</p>
                <p className="font-semibold">&lt;insurance_provider&gt;</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-500" />
              Chronic Diseases
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Type 2 Diabetes</p>
                    <p className="text-xs text-gray-600 mt-1">Well controlled</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Moderate
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Hypertension</p>
                    <p className="text-xs text-gray-600 mt-1">Well controlled</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Mild
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Allergies & Reactions
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Medicine
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">Penicillin</p>
                      <p className="text-xs text-gray-600">Skin rash</p>
                    </div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Food
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">Shellfish</p>
                      <p className="text-xs text-gray-600">Breathing difficulties</p>
                    </div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Medicine
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">Naproxen</p>
                      <p className="text-xs text-gray-600">Asthma flare</p>
                    </div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              </div>
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
