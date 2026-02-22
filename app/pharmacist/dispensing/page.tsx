"use client";
import React, { useState } from "react";

export default function DispenseMedicine() {
  const [reference, setReference] = useState("");
  const [patientData, setPatientData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // TODO: Fetch patient prescription and medical info from backend
    // Example placeholder:
    if (reference === "123456") {
      setPatientData({
        name: "John Doe",
        prescription: "Amoxicillin 500mg",
        allergies: "Penicillin",
        chronic: "Diabetes",
        condition: "Acute bronchitis"
      });
    } else {
      setPatientData(null);
      setError("Patient not found or no prescription available.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Dispense Medicine</h2>
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Patient Reference Number</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600">Search</button>
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {patientData && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-semibold mb-2">Patient: {patientData.name}</div>
            <div className="mb-2">Prescription: <span className="font-bold">{patientData.prescription}</span></div>
            <div className="mb-2">Allergies: <span className="text-red-600">{patientData.allergies}</span></div>
            <div className="mb-2">Chronic Diseases: <span className="text-orange-600">{patientData.chronic}</span></div>
            <div className="mb-2">Medical Condition: <span className="text-blue-600">{patientData.condition}</span></div>
            <button className="mt-4 w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600">Dispense Medicine</button>
          </div>
        )}
      </div>
    </div>
  );
}
