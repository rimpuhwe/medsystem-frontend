import { Heart, AlertTriangle, Lock } from "lucide-react"

export interface ChronicDisease {
  name: string
  severity?: "Mild" | "Moderate" | "Severe"
  status?: string
}

export interface Allergy {
  type?: "Medicine" | "Food"
  name: string
  reaction?: string
}

interface MedicalInformationProps {
  chronicDiseases?: string[] | null
  allergies?: string[] | null
}

const getSeverityColor = (severity?: ChronicDisease["severity"]) => {
  switch (severity) {
    case "Mild": return "bg-green-100 text-green-700"
    case "Moderate": return "bg-yellow-100 text-yellow-700"
    case "Severe": return "bg-red-100 text-red-700"
    default: return "bg-gray-100 text-gray-700"
  }
}

export default function MedicalInformation({
  chronicDiseases,
  allergies,
}: MedicalInformationProps) {

  const hasChronic = chronicDiseases && chronicDiseases.length > 0
  const hasAllergies = allergies && allergies.length > 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-green-500" />
          <h2 className="text-2xl text-green-500">
            Medical Information
          </h2>
        </div>
        <div className="flex items-center gap-2 border border-gray-400 rounded-full px-3 py-1.5 text-xs text-gray-600 bg-white">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-medium">
            Doctor Editable Only
          </span>
        </div>
      </div>

      {/* Chronic Diseases */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-green-500" />
          <h3 className="text-gray-800 text-sm font-semibold">
            Chronic Diseases
          </h3>
        </div>

        {!hasChronic ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
            No chronic diseases recorded.
          </div>
        ) : (
          <div className="space-y-3">
            {chronicDiseases!.map((disease, index) => (
              <div
                key={`${disease}-${index}`}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {disease}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Under medical monitoring
                  </p>
                </div>

                <span
                  className={`${getSeverityColor()} text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  Recorded
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Allergies */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold text-gray-800 text-sm">
            Allergies & Reactions
          </h3>
        </div>

        {!hasAllergies ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-sm text-gray-700">
            No allergies recorded.
          </div>
        ) : (
          <div className="space-y-3">
            {allergies!.map((allergy, index) => (
              <div
                key={`${allergy}-${index}`}
                className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {allergy}
                  </p>
                  <p className="text-xs text-gray-600">
                    Reaction details managed by doctor
                  </p>
                </div>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}