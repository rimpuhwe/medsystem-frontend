"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const clinics = ["Kigali Hospital", "Butare Medical Center", "Gisenyi Clinic"];
const departments = ["General Medicine", "Pediatrics", "Cardiology"];

export default function QueuePage() {
  const router = useRouter();
  const token = localStorage.getItem("token"); // JWT from login

  const [step, setStep] = useState(1);
  const [clinic, setClinic] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [queueCount, setQueueCount] = useState<number | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Fetch queue summary
  const fetchQueueSummary = async () => {
    if (!clinic || !department) return;

    try {
      const res = await fetch(
        `https://medsystemapplication.onrender.com/api/patient/queue/?clinicName=${encodeURIComponent(
          clinic
        )}&service=${encodeURIComponent(department)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch queue summary");

      const data = await res.json();

      // Assuming data has doctors array and total count
      const count =
        data.queueCount ||
        (data.queueManagementByService &&
          Object.values(data.queueManagementByService)
            .flat()
            .length) ||
        0;

      setQueueCount(count);

      // Extract doctor names if available
      const doctorsList =
        data.doctors?.map((d: any) => d.fullName) ||
        data.clinic?.doctors?.map((d: any) => d.fullName) ||
        [];

      setAvailableDoctors(doctorsList);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not fetch queue info. Please try again.");
      setQueueCount(null);
    }
  };

  useEffect(() => {
    if (step === 1) fetchQueueSummary();
  }, [clinic, department]);

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
      const body = {
        clinicName: clinic,
        service: department,
        doctorName: doctor || undefined,
      };

      const res = await fetch(
        "https://medsystemapplication.onrender.com/api/patient/queue/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to join queue");

      const data = await res.json();

      // Save active queue locally
      localStorage.setItem("activeQueue", JSON.stringify(data));

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
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            {queueCount !== null && (
              <p className="text-green-600 text-sm">
                {queueCount === 0
                  ? "No one is in this queue at the moment."
                  : `There are ${queueCount} patient(s) in this queue.`}
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
              {availableDoctors.map((d) => (
                <option key={d}>{d}</option>
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