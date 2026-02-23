
"use client";
import { Prescription } from "../../../types";
import { Download, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";

function PrescriptionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  const loadPrescriptions = () => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    const defaultPrescriptions: Prescription[] = [
      { 
        id: 'PRX-001', 
        patientName: 'John Doe', 
        date: '1/15/2024', 
        diagnosis: 'Hypertension management', 
        notes: 'Monitor blood pressure regularly', 
        patientId: 'PAT-001', 
        medicines: [
          { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'once-daily', duration: '30-days', instructions: 'Take with food' }
        ], 
        status: 'completed' 
      },
      { 
        id: 'PRX-002', 
        patientName: 'Sarah Wilson', 
        date: '1/18/2024', 
        diagnosis: 'Bacterial infection', 
        notes: 'Complete full course', 
        patientId: 'PAT-002', 
        medicines: [
          { id: '2', name: 'Amoxicillin', dosage: '500mg', frequency: 'three-times-daily', duration: '7-days', instructions: 'Take with food' }
        ], 
        status: 'active' 
      },
    ];
    
    if (savedPrescriptions) {
      try {
        setPrescriptions(JSON.parse(savedPrescriptions));
      } catch (error) {
        console.warn('Failed to parse prescriptions data:', error);
        localStorage.removeItem('prescriptions');
        setPrescriptions(defaultPrescriptions);
      }
    } else {
      setPrescriptions(defaultPrescriptions);
    }
  };
  
  useEffect(() => {
    loadPrescriptions();
    const interval = setInterval(loadPrescriptions, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (!prescription) return false;
    
    const matchesSearch = prescription.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || prescription.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter && prescription.date) {
      try {
        const prescDate = new Date(prescription.date);
        const today = new Date();
        
        if (dateFilter === 'today') {
          matchesDate = prescDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = prescDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = prescDate >= monthAgo;
        }
      } catch (error) {
        matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const printPrescriptions = () => {
    const content = `PRESCRIPTION HISTORY REPORT\n\nGenerated: ${new Date().toLocaleDateString()}\n\n` +
      filteredPrescriptions.map(p => 
        `ID: ${p.id}\nPatient: ${p.patientName}\nDate: ${p.date}\nDiagnosis: ${p.diagnosis}\nStatus: ${p.status}\nMedicines: ${p.medicines?.length || 0}\n\n`
      ).join('');
    
    const element = document.createElement('div');
    element.innerHTML = `<pre style="font-family: Arial; font-size: 12px; white-space: pre-wrap;">${content}</pre>`;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html><head><title>Prescription History</title></head>
      <body>${element.innerHTML}</body></html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };

  const escapeCSVField = (value: any): string => {
    if (value == null) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const exportToCSV = () => {
    const headers = 'ID,Patient,Date,Diagnosis,Status\n';
    const content = filteredPrescriptions.map(p => 
      `${escapeCSVField(p.id)},${escapeCSVField(p.patientName)},${escapeCSVField(p.date)},${escapeCSVField(p.diagnosis)},${escapeCSVField(p.status)}`
    ).join('\n');
    const blob = new Blob([headers + content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prescriptions.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Prescription History</h1>
          <p className="text-gray-600">View and manage all prescriptions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={printPrescriptions}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Print Report
          </button>
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <p className="text-sm text-gray-600 mb-4">Filter prescriptions by search, status, and date</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, prescription ID..."
              className="w-full text-sm bg-gray-50 text-gray-900 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">All Prescriptions</h3>
        <p className="text-sm text-gray-600 mb-6">Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Prescription ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">Diagnosis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Medicines</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredPrescriptions.length > 0 ? filteredPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-blue-600 font-medium">{prescription.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{prescription.patientName}</div>
                      <div className="text-gray-500 text-xs">{prescription.patientId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 hidden md:table-cell">{prescription.date}</td>
                  <td className="py-4 px-4 text-gray-700 hidden lg:table-cell">
                    <div className="max-w-xs truncate" title={prescription.diagnosis}>
                      {prescription.diagnosis}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{prescription.medicines?.length || 0} medicines</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      prescription.status === 'completed' ? 'bg-green-100 text-green-800' :
                      prescription.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => setSelectedPrescription(selectedPrescription?.id === prescription.id ? null : prescription)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {selectedPrescription?.id === prescription.id ? 'Close' : 'View'}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No prescriptions found. Create a prescription to see it here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        
      {selectedPrescription && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Prescription ID</label>
                <p className="text-gray-900">{selectedPrescription.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Patient</label>
                <p className="text-gray-900">{selectedPrescription.patientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date</label>
                <p className="text-gray-900">{selectedPrescription.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className="text-gray-900 capitalize">{selectedPrescription.status}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Diagnosis</label>
                <p className="text-gray-900">{selectedPrescription.diagnosis}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Medicines</label>
                <div className="space-y-2">
                  {selectedPrescription.medicines?.map((medicine, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{medicine.name} - {medicine.dosage}</p>
                      <p className="text-sm text-gray-600">{medicine.frequency} for {medicine.duration}</p>
                      {medicine.instructions && <p className="text-sm text-gray-500">{medicine.instructions}</p>}
                    </div>
                  )) || <p className="text-gray-500">No medicines listed</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionHistory;