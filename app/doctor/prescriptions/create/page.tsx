"use client";

import { FileText, Plus, Search, Send, X } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import { useToast } from "../../../hooks/useToast";
import { ToastContainer } from "../../../../components/Toast";
import { apiRequest } from "../../../../utils/api";

function PatientFoundView({ patient }: { patient: any }) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">Patient Found</h3>
        <p className="text-green-700">
          <strong>Name:</strong> {patient.name}
        </p>
        <p className="text-green-700">
          <strong>ID:</strong> {patient.ReferenceNumber ?? patient.id}
        </p>
        {patient.gender && (
          <p className="text-green-700">
            <strong>Gender:</strong> {patient.gender}
          </p>
        )}
        {patient.phoneNumber && (
          <p className="text-green-700">
            <strong>Phone:</strong> {patient.phoneNumber}
          </p>
        )}
        <p className="text-green-700">
          <strong>InsuranceProvider:</strong> {patient.insuranceProvider ?? "N/A"}
        </p>
        <div>
          <strong className="text-green-700">Allergies:</strong>{" "}
          {patient.allergies && patient.allergies.length > 0
            ? patient.allergies.join(", ")
            : "N/A"}
        </div>
        <div>
          <strong className="text-green-700">Chronic Diseases:</strong>{" "}
          {patient.chronicDiseases && patient.chronicDiseases.length > 0
            ? patient.chronicDiseases.join(", ")
            : "N/A"}
        </div>
      </div>
    </div>
  );
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface CreatePrescriptionProps {}

function CreatePrescription({}: CreatePrescriptionProps) {
  const { showSuccess, showError, toasts, removeToast } = useToast();
  const [patientId, setPatientId] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [foundPatient, setFoundPatient] = useState<any>(null);
  const [currentMedicine, setCurrentMedicine] = useState<Omit<Medicine, "id">>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const [formData, setFormData] = useState({
    chronicDiseases: "",
    allergies: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addMedicine = () => {
    if (
      currentMedicine.name &&
      currentMedicine.dosage &&
      currentMedicine.frequency &&
      currentMedicine.duration &&
      currentMedicine.instructions
    ) {
      const newMedicine: Medicine = {
        ...currentMedicine,
        id: Date.now().toString(),
      };
      setMedicines((prev) => [...prev, newMedicine]);
      setCurrentMedicine({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
      showSuccess("Medicine added successfully!");
    }
  };

  const removeMedicine = (id: string) => {
    setMedicines((meds) => meds.filter((med) => med.id !== id));
  };

  const handleMedicineChange = (
    field: keyof Omit<Medicine, "id">,
    value: string
  ) => {
    setCurrentMedicine((prev) => ({ ...prev, [field]: value }));
  };

  const splitToArray = (value: string): string[] =>
    value
      .split(/[,;\n]/)
      .map((v) => v.trim())
      .filter(Boolean);

  const searchPatient = async () => {
    if (!patientId.trim()) {
      showError("Please enter a Patient reference number to search.");
      return;
    }

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";

      // Try API first if not local token
      if (token && !token.startsWith('local_')) {
        const response = await apiRequest(
          `https://medsystemapplication.onrender.com/api/patient?patientReferenceNumber=${encodeURIComponent(
            patientId.trim()
          )}`,
          token
        );

        const patient = await response.json();
        setFoundPatient(patient);
        showSuccess(`Patient ${patient.fullName ?? patient.name ?? ""} found!`);
        return;
      }
    } catch (error: any) {
      console.log('API failed, checking localStorage');
    }

    // Fallback to localStorage
    try {
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const patient = patients.find((p: any) => 
        p.id === patientId.trim() || p.referenceNumber === patientId.trim()
      );
      
      if (patient) {
        setFoundPatient({
          name: patient.name || patient.fullName,
          id: patient.id,
          ReferenceNumber: patient.id,
          gender: patient.gender,
          phoneNumber: patient.phone,
          insuranceProvider: patient.insuranceProvider || 'N/A',
          allergies: patient.allergies || [],
          chronicDiseases: patient.chronicDiseases || []
        });
        showSuccess(`Patient ${patient.name || patient.fullName} found!`);
      } else {
        setFoundPatient(null);
        showError(`Patient with reference number "${patientId}" not found.`);
      }
    } catch (error: any) {
      console.error("Failed to fetch patient:", error);
      setFoundPatient(null);
      showError(`Patient with reference number "${patientId}" not found.`);
    }
  };

  const savePrescription = async (isDraft: boolean) => {
    if (!foundPatient || !diagnosis.trim() || medicines.length === 0) {
      showError(
        "Please search for a valid patient, add diagnosis, and at least one medicine."
      );
      return;
    }

    const payload = {
      diagnosis,
      medicines: medicines.map((m) => {
        const base = `${m.name} - ${m.dosage}`;
        const details = [m.frequency, m.duration]
          .filter(Boolean)
          .join(", ");
        const withDetails = details ? `${base}, ${details}` : base;
        return m.instructions
          ? `${withDetails} (${m.instructions})`
          : withDetails;
      }),
      chronicDiseases: splitToArray(formData.chronicDiseases),
      allergies: splitToArray(formData.allergies),
    };

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";

      // Try API first if not local token
      if (token && !token.startsWith('local_')) {
        const response = await apiRequest(
          `https://medsystemapplication.onrender.com/api/doctors/consultation?patientReferenceNumber=${encodeURIComponent(
            patientId.trim()
          )}`,
          token,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        showSuccess(
          `Consultation ${
            isDraft ? "saved as draft" : "created and sent"
          } successfully${
            (data as any)?.id ? ` with ID: ${(data as any).id}` : ""
          }.`
        );
        setPatientId("");
        setDiagnosis("");
        setMedicines([]);
        setFoundPatient(null);
        setFormData({ chronicDiseases: "", allergies: "" });
        return;
      }
    } catch (error) {
      console.log('API failed, using localStorage');
    }

    // Fallback to localStorage
    try {
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      const doctorProfile = JSON.parse(localStorage.getItem('doctorProfile') || '{}');
      const doctorName = doctorProfile.fullName || 'Unknown Doctor';
      
      const newPrescription = {
        id: `RX-${Date.now()}`,
        referenceId: `RX-${Date.now()}`,
        patientId: foundPatient.ReferenceNumber ?? foundPatient.id,
        patientName: foundPatient.fullName ?? foundPatient.name,
        doctorName: doctorName,
        diagnosis,
        medicines: medicines.map(m => ({
          medicineName: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          duration: m.duration,
          instructions: m.instructions
        })),
        date: new Date().toISOString(),
        status: isDraft ? 'pending' : 'active'
      };
      prescriptions.push(newPrescription);
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
      
      showSuccess(
        `Prescription ${isDraft ? "saved as draft" : "created"} successfully with ID: ${newPrescription.id}`
      );
      setPatientId("");
      setDiagnosis("");
      setMedicines([]);
      setFoundPatient(null);
      setFormData({ chronicDiseases: "", allergies: "" });
    } catch (error) {
      console.error("Failed to save prescription:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save prescription. Please try again.";
      showError(message);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Create New Prescription
          </h1>
          <p className="text-gray-600">
            Create and send prescriptions to patients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Patient Information
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Search for patient by ID
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchPatient()}
                placeholder="Enter Patient ID (e.g., PAT-001)"
                className="flex-1 px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                onClick={searchPatient}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {foundPatient && <PatientFoundView patient={foundPatient} />}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Diagnosis & Notes
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter diagnosis and additional notes
            </p>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis, symptoms, and additional notes..."
              className="w-full h-32 px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-900">
            Medical Information
            <Plus className="w-5 h-5 text-blue-600" />
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chronic Diseases
              </label>
              <textarea
                name="chronicDiseases"
                value={formData.chronicDiseases}
                onChange={handleInputChange}
                placeholder="List any chronic diseases or conditions"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="List any known allergies"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Prescription Medicines
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Add medicines to the prescription with dosage and instructions
          </p>

          {medicines.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Added Medicines ({medicines.length})
              </h3>
              <div className="space-y-3">
                {medicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {medicine.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {medicine.dosage} • {medicine.frequency} •{" "}
                        {medicine.duration}
                        {medicine.instructions &&
                          ` • ${medicine.instructions}`}
                      </div>
                    </div>
                    <button
                      onClick={() => removeMedicine(medicine.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-900">
              Add Medicine
              <Plus className="w-5 h-5 text-blue-600" />
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    value={currentMedicine.name}
                    onChange={(e) =>
                      handleMedicineChange("name", e.target.value)
                    }
                    placeholder="e.g., Amoxicillin"
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={currentMedicine.dosage}
                    onChange={(e) =>
                      handleMedicineChange("dosage", e.target.value)
                    }
                    placeholder="e.g., 500mg"
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={currentMedicine.frequency}
                    onChange={(e) =>
                      handleMedicineChange("frequency", e.target.value)
                    }
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="once-daily">Once Daily</option>
                    <option value="twice-daily">Twice Daily</option>
                    <option value="three-times-daily">
                      Three Times Daily
                    </option>
                    <option value="as-needed">As Needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={currentMedicine.duration}
                    onChange={(e) =>
                      handleMedicineChange("duration", e.target.value)
                    }
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="3-days">3 days</option>
                    <option value="5-days">5 days</option>
                    <option value="7-days">7 days</option>
                    <option value="14-days">14 days</option>
                    <option value="30-days">30 days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <input
                  type="text"
                  value={currentMedicine.instructions}
                  onChange={(e) =>
                    handleMedicineChange("instructions", e.target.value)
                  }
                  placeholder="e.g., take with food"
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={addMedicine}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Medicine
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={() => savePrescription(true)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Save as Draft ({medicines.length} medicines)
          </button>
          <button
            onClick={() => savePrescription(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
            Save and Send ({medicines.length} medicines)
          </button>
        </div>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  );
}

export default CreatePrescription;