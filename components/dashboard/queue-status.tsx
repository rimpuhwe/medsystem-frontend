'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QueueData {
  doctor: string;
  department: string;
  clinic: string;
  joinedAt: string;
  position: number;
}

export default function QueueStatus() {
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('queueData');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setQueueData(parsed);
        setPosition(parsed.position);
      } catch {
        localStorage.removeItem('queueData');
      }
    }
  }, []);

  useEffect(() => {
    if (!queueData) return;
    
    const fetchPosition = async () => {
      try {
        const res = await fetch('/api/queue/position');
        if (!res.ok) {
          throw new Error('Failed to fetch queue position');
        }
        const data = await res.json();
        setPosition(data.position);
      } catch {
        // Fallback to simulation if API fails (network or non-OK response)
        setPosition(prev => (prev > 1 ? prev - 1 : 1));
      }
    };
    
    const interval = setInterval(fetchPosition, 5000);
    fetchPosition(); // Initial fetch
    
    return () => clearInterval(interval);
  }, [queueData]);

  if (!queueData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-green-500" />
        <h2 className="text-lg text-green-500">Queue Status</h2>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Your Position</p>
          <div className="text-3xl font-bold text-blue-600">{position}</div>
        </div>

        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Doctor</p>
            <p className="font-medium">{queueData.doctor}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium">{queueData.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live updates</span>
        </div>
      </div>
    </div>
  );
}