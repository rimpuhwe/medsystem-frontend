"use client"

import { useState, useEffect, useRef } from "react"
import { Pill, Calendar, User, Clock, CheckCircle, Bell } from "lucide-react"

export interface Prescription {
  id: string
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  prescribedBy: string
  date: string
  instructions?: string
  status: "Active" | "Used"
  signedAt: Date
}

interface MyPrescriptionsProps {
  prescriptions?: Prescription[]
}

const defaultPrescriptions: Prescription[] = [
  {
    id: "1",
    medicineName: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    duration: "7 days",
    prescribedBy: "Dr. <name>",
    date: "2024-01-15",
    instructions: "Take with meals",
    status: "Active",
    signedAt: new Date(Date.now() - 6 * 60 * 1000)
  },
]

export default function MyPrescriptions({ prescriptions = defaultPrescriptions }: MyPrescriptionsProps = {}) {
  const [activeNotifications, setActiveNotifications] = useState<Array<{id: string, prescription: Prescription, expiresAt: number}>>([])
  const [timeRemaining, setTimeRemaining] = useState<{[key: string]: string}>({})
  const notifiedIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    const checkNotifications = () => {
      const now = Date.now()
      const newNotifications: Array<{id: string, prescription: Prescription, expiresAt: number}> = []
      
      prescriptions.forEach((prescription) => {
        const timeSinceSigned = now - prescription.signedAt.getTime()
        const minutesPassed = Math.floor(timeSinceSigned / (1000 * 60))
        
        if (minutesPassed >= 5 && minutesPassed < 10 && prescription.status === "Active") {
          const expiresAt = prescription.signedAt.getTime() + (10 * 60 * 1000)
          
          newNotifications.push({ id: prescription.id, prescription, expiresAt })
          
          if (!notifiedIdsRef.current.has(prescription.id)) {
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("New Prescription", {
                body: `Your doctor has prescribed ${prescription.medicineName} ${prescription.dosage}`,
                icon: "/favicon.ico"
              })
            }
            notifiedIdsRef.current.add(prescription.id)
          }
        }
      })

      const timers: {[key: string]: string} = {}
      newNotifications.forEach(notif => {
        const remaining = notif.expiresAt - now
        const minutes = Math.floor(remaining / 60000)
        const seconds = Math.floor((remaining % 60000) / 1000)
        timers[notif.id] = `${minutes}:${seconds.toString().padStart(2, '0')}`
      })
      setTimeRemaining(timers)
      setActiveNotifications(newNotifications)
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 1000)

    return () => clearInterval(interval)
  }, [prescriptions])

  const removeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Pill className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg text-blue-500">My Prescriptions</h2>
      </div>

      {activeNotifications.length > 0 && (
        <div className="mb-4 space-y-2">
          {activeNotifications.map((notif) => (
            <div key={notif.id} className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold text-blue-900">New Prescription</h3>
                </div>
                <button 
                  onClick={() => removeNotification(notif.id)}
                  className="text-blue-600 hover:text-blue-800 text-xl leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Your doctor has prescribed <strong>{notif.prescription.medicineName} {notif.prescription.dosage}</strong>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Dosage:</strong> Take 1 tablet {notif.prescription.frequency} for {notif.prescription.duration}
              </p>
              <div className="text-xs text-gray-500">
                Closes in {timeRemaining[notif.id] || '0:00'}
              </div>
            </div>
          ))}
        </div>
      )}
    
      {prescriptions.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50/50">
          <div className="flex flex-col items-start space-y-3">
            <Pill className="w-10 h-10 text-gray-400" />
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-800 text-sm">
                No Prescriptions Yet
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
                Your prescriptions will appear here when your doctor sends them.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className={`p-4 rounded-lg border ${
                prescription.status === "Active" 
                  ? "bg-green-50 border-green-200" 
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{prescription.medicineName}</h3>
                  <p className="text-blue-600 text-xs font-semibold mt-1">{prescription.dosage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    prescription.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                    {prescription.status === "Active" && <Clock className="w-3 h-3 inline mr-1" />}
                    {prescription.status === "Used" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {prescription.status}
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {prescription.frequency}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Duration: {prescription.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Prescribed by {prescription.prescribedBy} on {prescription.date}</span>
                </div>
                {prescription.instructions && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-gray-700 font-medium">Instructions: {prescription.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
