"use client";

import { useState } from "react";
import {
  Eye,
  Download,
  Filter,
  Calendar,
  FileDown,
  X,
} from "lucide-react";

export default function DispensedRecordsPage() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("All Providers");
  const [viewModal, setViewModal] = useState<any>(null);

  const allRecords = [
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

  const records = allRecords.filter(r => {
    const matchSearch = search === '' || r.patient.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateFilter === '' || r.date === dateFilter;
    const matchProvider = providerFilter === 'All Providers' || r.insurance === providerFilter;
    return matchSearch && matchDate && matchProvider;
  });

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
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <Calendar
              size={16}
              className="absolute right-3 top-3 text-gray-400"
            />
          </div>

          <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Providers</option>
            <option>RSSB</option>
            <option>MMI</option>
            <option>Radiant</option>
          </select>

          <button onClick={() => { setSearch(''); setDateFilter(''); setProviderFilter('All Providers'); }} className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50">
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

          <button onClick={handleExport} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
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
              <button onClick={() => setViewModal(record)} className="border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                <Eye size={16} />
              </button>
              <button onClick={() => handleDownload(record)} className="border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Prescription Details</h3>
              <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-gray-500 text-sm">Reference ID:</span><p className="font-medium">{viewModal.id}</p></div>
                <div><span className="text-gray-500 text-sm">Patient:</span><p className="font-medium">{viewModal.patient}</p></div>
                <div><span className="text-gray-500 text-sm">Insurance:</span><p className="font-medium">{viewModal.insurance}</p></div>
                <div><span className="text-gray-500 text-sm">Coverage:</span><p className="font-medium">{viewModal.coverage}</p></div>
                <div><span className="text-gray-500 text-sm">Policy Number:</span><p className="font-medium">{viewModal.providerPolicy}</p></div>
                <div><span className="text-gray-500 text-sm">Digital Ref:</span><p className="font-medium">{viewModal.digitalRef}</p></div>
                <div><span className="text-gray-500 text-sm">Date:</span><p className="font-medium">{viewModal.date}</p></div>
                <div><span className="text-gray-500 text-sm">Time:</span><p className="font-medium">{viewModal.time}</p></div>
                <div><span className="text-gray-500 text-sm">Total:</span><p className="font-medium">RWF {viewModal.total}</p></div>
                <div><span className="text-gray-500 text-sm">Pharmacist:</span><p className="font-medium">{viewModal.pharmacist}</p></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => handleDownload(viewModal)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Download size={16} /> Download Receipt
                </button>
                <button onClick={() => setViewModal(null)} className="px-6 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function handleDownload(record: any) {
    const content = `
DIGITAL MEDICAL ORDINANCE SYSTEM
Dispensed Prescription Receipt
${'='.repeat(50)}

Reference ID: ${record.id}
Patient: ${record.patient}
Insurance: ${record.insurance} (${record.coverage} coverage)
Policy: ${record.providerPolicy}
Digital Ref: ${record.digitalRef}

Date: ${record.date}
Time: ${record.time}
Total: RWF ${record.total}
Pharmacist: ${record.pharmacist}

Status: Completed
${'='.repeat(50)}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${record.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExport() {
    const csv = [
      ['Reference ID', 'Patient', 'Insurance', 'Coverage', 'Policy', 'Digital Ref', 'Date', 'Time', 'Total', 'Pharmacist'],
      ...records.map(r => [r.id, r.patient, r.insurance, r.coverage, r.providerPolicy, r.digitalRef, r.date, r.time, r.total, r.pharmacist])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dispensed_Records_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}