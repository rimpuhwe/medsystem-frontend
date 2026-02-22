"use client";
import React from "react";

const demoReports = [
  {
    date: "2026-02-22",
    patient: "John Doe",
    insuranceProvider: "RAMA",
    insuranceNo: "123456",
    coverage: "80%",
    totalAmount: "$100",
    patientShare: "$20",
  },
  {
    date: "2026-02-22",
    patient: "Jane Smith",
    insuranceProvider: "RAMA",
    insuranceNo: "789012",
    coverage: "70%",
    totalAmount: "$50",
    patientShare: "$15",
  },
];

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Daily Dispensing Report</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border-b text-left">Date</th>
              <th className="p-2 border-b text-left">Patient</th>
              <th className="p-2 border-b text-left">Insurance Provider</th>
              <th className="p-2 border-b text-left">Insurance No</th>
              <th className="p-2 border-b text-left">Coverage</th>
              <th className="p-2 border-b text-left">Total Amount</th>
              <th className="p-2 border-b text-left">Patient Share</th>
            </tr>
          </thead>
          <tbody>
            {demoReports.map((r, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.patient}</td>
                <td className="p-2">{r.insuranceProvider}</td>
                <td className="p-2">{r.insuranceNo}</td>
                <td className="p-2">{r.coverage}</td>
                <td className="p-2">{r.totalAmount}</td>
                <td className="p-2">{r.patientShare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}