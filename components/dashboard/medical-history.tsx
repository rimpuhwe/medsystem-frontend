"use client"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MedicalHistory() {
  const router = useRouter()
  
  const handleRequestReport = () => {
    router.push('/patient/request-medical-records')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg  text-blue-500">Medical History</h2>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
        You can securely access your complete medical history through this portal. Please click the button below to
        review your records. Your information is protected, and only you or authorized medical staff can view it.
      </p>
      <button 
        type="button"
        onClick={handleRequestReport}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded-md flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Request your Medical Report
      </button>
    </div>
  )
}