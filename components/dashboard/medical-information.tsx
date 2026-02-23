import { Heart, AlertTriangle, Lock } from "lucide-react"

export interface ChronicDisease {
  name: string
  severity: "Mild" | "Moderate" | "Severe"
  status: string
}

export interface Allergy {
  type: "Medicine" | "Food"
  name: string
  reaction: string
}

interface MedicalInformationProps {
  chronicDiseases?: ChronicDisease[]
  allergies?: Allergy[]
}

const defaultChronicDiseases: ChronicDisease[] = [
  { name: "Type 2 Diabetes", severity: "Moderate", status: "Well controlled" },
  { name: "Hypertension", severity: "Mild", status: "Well controlled" },
]

const defaultAllergies: Allergy[] = [
  { type: "Medicine", name: "Penicillin", reaction: "Skin rash" },
  { type: "Food", name: "Shellfish", reaction: "Breathing difficulties" },
  { type: "Medicine", name: "Naproxen", reaction: "Asthma flare" },
]

const getSeverityColor = (severity: ChronicDisease['severity']) => {
  switch (severity) {
    case "Mild": return "bg-green-100 text-green-700"
    case "Moderate": return "bg-yellow-100 text-yellow-700"
    case "Severe": return "bg-red-100 text-red-700"
    default: return "bg-gray-100 text-gray-700"
  }
}

export default function MedicalInformation({ 
  chronicDiseases = defaultChronicDiseases, 
  allergies = defaultAllergies 
}: MedicalInformationProps = {}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-green-500" />
          <h2 className="text-2xl  text-green-500">Medical Information</h2>
        </div>
        <div className="flex items-center gap-2 border border-gray-400 rounded-full px-3 py-1.5 text-xs text-gray-600 bg-white">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-medium">Doctor Editable Only</span>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-green-500" />
          <h3 className=" text-gray-800 text-sm">Chronic Diseases</h3>
        </div>
        <div className="space-y-3">
          {chronicDiseases.map((disease) => (
            <div
              key={`${disease.name}-${disease.severity}`}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div>
                <p className="font-semibold text-gray-800 text-sm">{disease.name}</p>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {disease.status}
                </p>
              </div>
              <span className={`${getSeverityColor(disease.severity)} text-xs font-semibold px-3 py-1 rounded-full`}>
                {disease.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold text-gray-800 text-sm">Allergies & Reactions</h3>
        </div>
        <div className="space-y-3">
          {allergies.map((allergy) => (
            <div key={`${allergy.type}-${allergy.name}`} className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-3 flex-1">
                <span
                  className={`font-semibold text-xs px-3 py-1 rounded-full text-white whitespace-nowrap ${
                    allergy.type === "Medicine" ? "bg-red-600" : "bg-red-500"
                  }`}
                >
                  {allergy.type}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{allergy.name}</p>
                  <p className="text-xs text-gray-600">{allergy.reaction}</p>
                </div>
              </div>
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}