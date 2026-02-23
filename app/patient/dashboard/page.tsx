"use client";

import ProfileOverview from "@/components/dashboard/profileOverview";
import QueueCard from "@/components/dashboard/queueCard";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>

        <p className="text-gray-500">
          Digital Medical Ordinance System – Rwanda
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          <ProfileOverview fullName="raissa micheline" dateOfBirth="2002-11-01" phone="078 123 4567" email="4dH9e@example.com" patientId="PAT-456789" insuranceProvider="MMI"/>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Medical Information</h3>

            <p className="text-gray-500 text-sm">
              Chronic diseases and allergies
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">My Prescriptions</h3>

            <p className="text-gray-500 text-sm">
              QR code will appear when issued
            </p>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Medical History</h3>

            <p className="text-sm text-gray-500 mb-3">
              Access your medical records securely
            </p>

            <a href="/medical-history" className="text-blue-600 font-medium">
              Request access →
            </a>
          </Card>

          <QueueCard />
        </div>
      </div>
    </div>
  );
}
