"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function JoinQueue({ token }: { token: string }) {
  const [queueData, setQueueData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('patientQueue')
    if (stored) {
      setQueueData(JSON.parse(stored))
    }
  }, [])

  if (!queueData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg text-blue-500">Join Queue</h2>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Join the virtual queue to see a doctor. You'll receive updates on your position and can track your estimated appointment time.
        </p>

        <button
          onClick={() => (window.location.href = "/patient/Queue")}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Join Queue Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-lg text-blue-500 mb-4">Queue Position</h2>

      <div className="text-5xl font-bold text-blue-600 mb-4">
        #{queueData.queueNumber || queueData.position || 1}
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Status:</strong> {queueData.status || 'Waiting'}
        </p>
        <p>
          <strong>Position:</strong> {queueData.position || 1} in line
        </p>
        <p>
          <strong>Clinic:</strong> {queueData.clinic}
        </p>
        <p>
          <strong>Service:</strong> {queueData.service}
        </p>
        {queueData.doctor && (
          <p>
            <strong>Doctor:</strong> {queueData.doctor}
          </p>
        )}
      </div>
      
      <button
        onClick={() => {
          localStorage.removeItem('patientQueue')
          setQueueData(null)
        }}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
      >
        Leave Queue
      </button>
    </div>
  );
}