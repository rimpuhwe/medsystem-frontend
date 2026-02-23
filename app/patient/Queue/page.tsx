"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const clinics = ["Kigali Hospital", "Butare Medical Center", "Gisenyi Clinic"];
const departments = ["General Medicine", "Pediatrics", "Cardiology"];
const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];

export default function QueuePage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [clinic, setClinic] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [queueCount, setQueueCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Check how many are in that queue
  useEffect(() => {
    if (!clinic || !department) {
      setQueueCount(null);
      return;
    }

    const queue = JSON.parse(localStorage.getItem("patientQueue") || "[]");

    const count = queue.filter(
      (q: any) =>
        q.clinic === clinic && q.department === department
    ).length;

    setQueueCount(count);
  }, [clinic, department]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic || !department) return;
    setStep(2);
  };

  const handleJoin = () => {
    setLoading(true);

    setTimeout(() => {
      const queue = JSON.parse(localStorage.getItem("patientQueue") || "[]");

      const position =
        queue.filter(
          (q: any) =>
            q.clinic === clinic && q.department === department
        ).length + 1;

      const newEntry = {
        clinic,
        department,
        doctor: doctor || null,
        position,
        status: "Waiting",
      };

      queue.push(newEntry);
      localStorage.setItem("patientQueue", JSON.stringify(queue));
      localStorage.setItem("activeQueue", JSON.stringify(newEntry));

      router.push("/patient/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Join Queue
        </h2>

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
              {doctors.map((d) => (
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