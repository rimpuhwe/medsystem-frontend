"use client"

import Link from "next/link"
import { Download, FileText, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function ReportReady() {
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

  const handleDownloadPDF = () => {
    const recordData = `
MEDICAL RECORD

Patient Name: ${patientData?.fullName || 'N/A'}
Reference ID: ${patientData?.referenceNumber || 'N/A'}
Date of Birth: ${patientData?.dateOfBirth || 'N/A'}
Insurance: ${patientData?.insurance || 'N/A'}
Email: ${patientData?.email || 'N/A'}
Phone: ${patientData?.phone || 'N/A'}

MEDICAL INFORMATION

Chronic Diseases:
${patientData?.chronicDiseases?.map((d: any) => `- ${d}`).join('\n') || '- None'}

Allergies:
${patientData?.allergies?.map((a: any) => `- ${a}`).join('\n') || '- None'}

Generated on: ${new Date().toLocaleString()}
    `
    
    const blob = new Blob([recordData], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'medical-record.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleViewOnline = () => {
    window.open('/patient/medical-record-view', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-500 mb-2">Requested Report is Ready!</h1>
        </div>

        <div className="bg-white border border-blue-500 rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="3"/>
                <path d="M30 50 L45 65 L70 35" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-600">Verification successful</h2>
              <p className="text-gray-600 mt-1">You now have access to your complete medical records</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8 max-w-md mx-auto">
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-4 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Record (TXT)
          </button>

          <button 
            onClick={handleViewOnline}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white hover:border-blue-500 py-4 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            View Record Online
          </button>
        </div>

        <Link href="/patientDashboard/dashboard" className="flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Return to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}
