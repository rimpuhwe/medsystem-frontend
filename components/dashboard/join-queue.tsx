"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JoinQueue() {
  const router = useRouter();
  const [queueData, setQueueData] = useState<any>(null);

  useEffect(() => {
    const active = localStorage.getItem("activeQueue");
    if (active) {
      setQueueData(JSON.parse(active));
    }
  }, []);

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
          onClick={() => router.push("/patient/Queue")}
          className="w-full bg-blue-500 text-white py-3 rounded-md"
        >
          Join Queue Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-lg text-blue-500 mb-4">
        Queue Position
      </h2>

      <div className="text-5xl font-bold text-blue-600 mb-4">
        {queueData.position}
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Status:</strong> {queueData.status}</p>
        <p><strong>Department:</strong> {queueData.department}</p>
        {queueData.doctor && (
          <p><strong>Doctor:</strong> {queueData.doctor}</p>
        )}
      </div>
    </div>
  );
}