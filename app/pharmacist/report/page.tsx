"use client";

import { useState } from "react";
import {
  Eye,
  Download,
  Filter,
  Calendar,
  FileDown,
} from "lucide-react";

export default function DispensedRecordsPage() {
  const [search, setSearch] = useState("");

  const records = [
    {
      id: "RX-2024-001547",
      patient: "Jean Baptiste Nkurunziza",
      insurance: "RSSB",
      coverage: "85%",
      providerPolicy: "RSSB-2024-7891234",
      digitalRef: "DO-RW-2024-001547",
      date: "2024-01-15",
      time: "14:30",
      total: "5,000",
      pharmacist: "Grace Uwimana",
    },
    {
      id: "RX-2024-001548",
      patient: "Marie Claire Uwizeyimana",
      insurance: "MMI",
      coverage: "90%",
      providerPolicy: "MMI-2024-5567890",
      digitalRef: "DO-RW-2024-001548",
      date: "2024-01-15",
      time: "15:45",
      total: "8,500",
      pharmacist: "Grace Uwimana",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] p-8">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dispensed Prescription
        </h1>
        <p className="text-sm text-gray-500">
          Sunday, 7 September 2025
        </p>
      </div>

      {/* TITLE CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-700">
          Dispensed Prescription Records
        </h2>
      </div>

      {/* SEARCH FILTER CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <Filter size={18} className="text-teal-500" />
          <h3 className="font-medium">Search & Filter Records</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Patient name, Reference ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="relative">
            <input
              type="date"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <Calendar
              size={16}
              className="absolute right-3 top-3 text-gray-400"
            />
          </div>

          <select className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Providers</option>
            <option>RSSB</option>
            <option>MMI</option>
            <option>Radiant</option>
          </select>

          <button className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50">
            Clear Filters
          </button>
        </div>
      </div>

      {/* RECORD TABLE CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-700">
            Dispensed Records ({records.length})
          </h3>

          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <FileDown size={16} />
            Export Records
          </button>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 text-xs text-gray-500 border-b pb-3 mb-4">
          <span>Patient Information</span>
          <span>Insurance Coverage</span>
          <span>Digital Ordinance</span>
          <span>Dispensing Timeline</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* RECORD ROWS */}
        {records.map((record) => (
          <div
            key={record.id}
            className="grid grid-cols-6 gap-4 items-start border-b py-5 last:border-none"
          >
            {/* Patient */}
            <div>
              <p className="text-blue-600 font-medium cursor-pointer hover:underline">
                {record.patient}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Reference: {record.id}
              </p>
            </div>

            {/* Insurance */}
            <div>
              <p className="text-sm font-medium text-green-600">
                {record.insurance}
              </p>
              <p className="text-xs text-gray-500">
                Policy: {record.providerPolicy}
              </p>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mt-1 inline-block">
                Coverage {record.coverage}
              </span>
            </div>

            {/* Digital */}
            <div>
              <p className="text-blue-600 text-sm">
                {record.digitalRef}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                2 medicines prescribed
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="text-blue-600 font-medium">
                Dispensed: {record.date}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Time: {record.time}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Total: RWF {record.total}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pharmacist: {record.pharmacist}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                Completed
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                <Eye size={16} />
              </button>
              <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}