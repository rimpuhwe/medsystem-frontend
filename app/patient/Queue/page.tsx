"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QueuePage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [token, setToken] = useState<string | null>();
  const [clinic, setClinic] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [clinics, setClinics] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
    const storedClinics = JSON.parse(localStorage.getItem('clinics') || '[]');
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setClinics(storedClinics);
    setDoctors(storedDoctors);
  }, []);

  useEffect(() => {
    if (clinic) {
      const selectedClinic = clinics.find(c => c.name === clinic);
      setAvailableServices(selectedClinic?.services || []);
      setDepartment("");
    }
  }, [clinic, clinics]);

  useEffect(() => {
    if (clinic && department) {
      const filtered = doctors.filter(d => d.clinic === clinic && d.specialty === department);
      setFilteredDoctors(filtered);
    }
  }, [clinic, department, doctors]);

  // Step 1 continue
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic || !department) return;
    setStep(2);
  };

  // Step 2 join queue
  const handleJoin = async () => {
    setLoading(true);
    try {
      // Get existing doctor queue
      const doctorQueue = JSON.parse(localStorage.getItem('doctorQueue') || '[]');
      
      // Filter queue by same clinic and doctor (or service if no specific doctor)
      const sameClinicDoctorQueue = doctorQueue.filter((p: any) => 
        p.clinic === clinic && 
        (doctor ? p.doctor === doctor : p.reason === department)
      );
      
      // Calculate queue number based on same clinic/doctor queue
      const queueNumber = sameClinicDoctorQueue.length + 1;
      const position = sameClinicDoctorQueue.filter((p: any) => p.status === 'waiting').length + 1;
      
      const queueData = {
        clinic,
        service: department,
        doctor: doctor || 'Any available',
        position,
        queueNumber,
        status: 'Waiting',
        joinedAt: new Date().toISOString()
      };

      localStorage.setItem('patientQueue', JSON.stringify(queueData));
      
      // Add to doctor's queue
      const newPatient = {
        id: Date.now().toString(),
        name: 'Patient ' + queueNumber,
        queueNumber,
        clinic,
        doctor: doctor || 'Any available',
        appointmentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        reason: department,
        status: 'waiting' as const
      };
      doctorQueue.push(newPatient);
      localStorage.setItem('doctorQueue', JSON.stringify(doctorQueue));
      
      router.push("/patient/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to join queue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Join Queue</h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
        )}

        {step === 1 && (
          <form onSubmit={handleContinue} className="space-y-5">
            <select
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Clinic</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              disabled={!clinic}
              className="w-full p-3 border rounded-md disabled:bg-gray-100"
            >
              <option value="">Select Service</option>
              {availableServices.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {clinic && department && (
              <p className="text-blue-600 text-sm">
                {filteredDoctors.length === 0
                  ? "No doctors available for this service."
                  : `${filteredDoctors.length} doctor(s) available for this service.`}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md"
            >
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Doctor (Optional)</option>
              {filteredDoctors.map((d) => (
                <option key={d.id} value={d.name}>{d.name} - {d.specialty}</option>
              ))}
            </select>

            <button
              onClick={handleJoin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md"
            >
              {loading ? "Joining..." : "Join Queue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}