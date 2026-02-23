"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, Shield, User } from "lucide-react"

interface ProfileOverviewProps {
  fullName: string
  patientId: string
  email: string
  phone: string
  dateOfBirth: string
  insuranceProvider?: string
}

export default function ProfileOverview({
  fullName,
  patientId,
  email,
  phone,
  dateOfBirth,
  insuranceProvider,
}: ProfileOverviewProps) {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="shadow-md border-0 bg-white">
      <CardHeader className="flex flex-row item-center gap-2">
        <User className="w-6 h-6 text-blue-600" />
        <CardTitle className="text-xl font-semibold text-gray-900">
          Profile Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {fullName}
            </p>
            <p className="text-sm text-gray-500">
              Patient ID: {patientId}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InfoItem
            icon={<Mail size={18} />}
            label="Email"
            value={email}
          />

          <InfoItem
            icon={<Phone size={18} />}
            label="Phone"
            value={phone}
          />

          <InfoItem
            icon={<Calendar size={18} />}
            label="Date of Birth"
            value={dateOfBirth}
          />

          {insuranceProvider && (
            <InfoItem
              icon={<Shield size={18} />}
              label="Insurance Provider"
              value={insuranceProvider}
            />
          )}

        </div>

      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blue-600 mt-1">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}