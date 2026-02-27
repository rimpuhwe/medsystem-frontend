"use client"

import { Clock, User, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../../components/Toast";
import { QueuePatient } from "../../types";

export default function PatientQueue() {
  const [queue, setQueue] = useState<QueuePatient[]>([]);
  const [activeConsultation, setActiveConsultation] = useState<QueuePatient | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const router = useRouter();
  const { showSuccess, showError, showInfo, toasts, removeToast } = useToast();

  useEffect(() => {
    loadQueue();
    setupWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const loadQueue = () => {
    const savedQueue = localStorage.getItem('doctorQueue');
    if (savedQueue) {
      try {
        const queueData = JSON.parse(savedQueue);
        const activeQueue = queueData.filter((p: QueuePatient) => p.status !== 'completed');
        setQueue(activeQueue);

        const inConsultation = activeQueue.find((p: QueuePatient) => p.status === 'in-consultation');
        setActiveConsultation(inConsultation || null);
      } catch (error) {
        console.warn('Failed to parse queue data:', error);
        localStorage.removeItem('doctorQueue');
        setQueue([]);
      }
    }
  };

  const setupWebSocket = () => {
    try {
      wsRef.current = new WebSocket('ws://localhost:3000');

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'QUEUE_UPDATE') {
          loadQueue();
        }
      };

      wsRef.current.onerror = () => {
        console.log('WebSocket connection failed, using localStorage polling');
        const interval = setInterval(loadQueue, 2000);
        return () => clearInterval(interval);
      };
    } catch (error) {
      console.log('WebSocket not available, using localStorage polling');
      const interval = setInterval(loadQueue, 2000);
      return () => clearInterval(interval);
    }
  };

  const broadcastUpdate = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'QUEUE_UPDATE' }));
    }
  };

  const callNextPatient = () => {
    const nextPatient = queue.find(p => p.status === 'waiting');
    if (nextPatient) {
      const updatedQueue = queue.map(p =>
        p.id === nextPatient.id ? { ...p, status: 'in-consultation' as const } : p
      );
      setQueue(updatedQueue);
      setActiveConsultation(nextPatient);
      localStorage.setItem('doctorQueue', JSON.stringify(updatedQueue));
      localStorage.setItem('currentPatient', JSON.stringify(nextPatient));
      broadcastUpdate();
      showSuccess(`Called ${nextPatient.name} for consultation`);
    } else {
      showInfo('No patients waiting in queue');
    }
  };

  const completeConsultation = () => {
    if (activeConsultation) {
      const updatedQueue = queue.map(p =>
        p.id === activeConsultation.id ? { ...p, status: 'completed' as const } : p
      );
      setQueue(updatedQueue.filter(p => p.status !== 'completed'));
      setActiveConsultation(null);
      localStorage.setItem('doctorQueue', JSON.stringify(updatedQueue));
      localStorage.removeItem('currentPatient');
      broadcastUpdate();
      showSuccess(`Consultation with ${activeConsultation.name} completed`);
    }
  };

  const consultPatient = () => {
    if (activeConsultation) {
      router.push('/doctor/prescriptions/create');
    }
  };

  const waitingPatients = queue.filter(p => p.status === 'waiting');
  const completedToday = queue.filter(p => p.status === 'completed').length;

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Patient Queue</h1>
          <p className="text-gray-600">Manage your consultation queue</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Consultation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Consultation</h2>
              {activeConsultation ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{activeConsultation.name}</h3>
                        <p className="text-sm text-gray-600">#{activeConsultation.queueNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Time:</span> {activeConsultation.appointmentTime}</p>
                      <p><span className="font-medium">Reason:</span> {activeConsultation.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={consultPatient}
                      className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Consult
                    </button>
                    <button
                      onClick={completeConsultation}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No active consultation</p>
                  {waitingPatients.length > 0 && (
                    <button
                      onClick={callNextPatient}
                      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Call Next Patient
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{waitingPatients.length}</div>
                <div className="text-sm text-gray-600">Waiting</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-green-600">{completedToday}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Queue List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Queue</h2>
                {waitingPatients.length > 0 && !activeConsultation && (
                  <button
                    onClick={callNextPatient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Call Next
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {queue.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border-2 transition-colors ${patient.status === 'in-consultation'
                        ? 'border-blue-500 bg-blue-50'
                        : patient.status === 'completed'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${patient.status === 'in-consultation'
                            ? 'bg-blue-600'
                            : patient.status === 'completed'
                              ? 'bg-green-600'
                              : 'bg-gray-400'
                          }`}>
                          {patient.queueNumber}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.appointmentTime} • {patient.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${patient.status === 'waiting'
                            ? 'bg-yellow-100 text-yellow-800'
                            : patient.status === 'in-consultation'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                          {patient.status === 'waiting' ? 'Waiting' :
                            patient.status === 'in-consultation' ? 'In Progress' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {queue.length === 0 && (
                <div className="text-center py-8">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No patients in queue today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}