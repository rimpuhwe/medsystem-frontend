"use client";
import { Search, Users, Pill } from "lucide-react";
import { Patient } from "../../types";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../../components/Toast";

function PatientDetailsView({ patient }: { patient: Patient }) {
  const [patientPrescriptions, setPatientPrescriptions] = useState<any[]>([]);
  
  useEffect(() => {
    if (!patient) return;
    
    const savedPrescriptions = localStorage.getItem('prescriptions');
    if (savedPrescriptions) {
      try {
        const prescriptions = JSON.parse(savedPrescriptions);
        const patientPrescs = prescriptions.filter((p: any) => p.patientId === patient.id);
        setPatientPrescriptions(patientPrescs);
      } catch (error) {
        console.warn('Failed to parse prescriptions data:', error);
        setPatientPrescriptions([]);
      }
    }
  }, [patient]);


  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Details</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="text-gray-900">{patient.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Patient ID</label>
            <p className="text-gray-900">{patient.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Gender</label>
            <p className="text-gray-900">{patient.gender}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-gray-900">{patient.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-900">{patient.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Last Visit</label>
            <p className="text-gray-900">{patient.lastVisit}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Total Prescriptions</label>
            <p className="text-gray-900">{patientPrescriptions.length}</p>
          </div>
        </div>
      </div>
      
      {patientPrescriptions.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Pill className="w-4 h-4" />
            Prescribed Medicines
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {patientPrescriptions.map((prescription) => (
              <div key={prescription.id} className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-sm text-gray-900">{prescription.date} - {prescription.diagnosis}</p>
                <div className="mt-2 space-y-1">
                  {prescription.medicines?.map((medicine: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                      <span className="font-medium">{medicine.name}</span> - {medicine.dosage}
                      <br />
                      <span className="text-gray-600">{medicine.frequency} for {medicine.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [prescriptionCounts, setPrescriptionCounts] = useState<{[key: string]: number}>({});
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { toasts, removeToast } = useToast();
  
  const calculatePrescriptionCounts = (patientList: Patient[]) => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    const counts: {[key: string]: number} = {};
    
    if (savedPrescriptions) {
      try {
        const prescriptions = JSON.parse(savedPrescriptions);
        patientList.forEach(patient => {
          counts[patient.id] = prescriptions.filter((p: any) => p.patientId === patient.id).length;
        });
      } catch (error) {
        console.warn('Failed to parse prescriptions for counts:', error);
        localStorage.removeItem('prescriptions');
        patientList.forEach(patient => {
          counts[patient.id] = 0;
        });
      }
    } else {
      patientList.forEach(patient => {
        counts[patient.id] = 0;
      });
    }
    
    setPrescriptionCounts(counts);
  };

  const loadPatients = () => {
    const savedPatients = localStorage.getItem('patients');
    let patientList: Patient[];
    
    const defaultPatients = [
      { id: 'PAT-001', name: 'John Doe', gender: 'Male', phone: '+1 (555) 123-4567', email: 'j.doe@gmail.com', lastVisit: '1/15/2024', prescriptions: 12 },
      { id: 'PAT-002', name: 'Sarah Wilson', gender: 'Female', phone: '+1 (555) 234-5678', email: 's.wilson@gmail.com', lastVisit: '1/18/2024', prescriptions: 5 },
    ];
    
    if (savedPatients) {
      try {
        patientList = JSON.parse(savedPatients);
      } catch (error) {
        console.warn('Failed to parse patients data:', error);
        localStorage.removeItem('patients');
        patientList = defaultPatients;
      }
    } else {
      patientList = defaultPatients;
    }
    
    setPatients(patientList);
    calculatePrescriptionCounts(patientList);
  };
  
  useEffect(() => {
    loadPatients();
    
    
    const handleStorageChange = () => loadPatients();
    window.addEventListener('storage', handleStorageChange);
    
  
    const interval = setInterval(loadPatients, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient?.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Patient Records</h1>
        <p className="text-gray-600">Search and manage patient medical records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Directory</h2>
            <p className="text-gray-600 mb-6">Search and select patients to view their records</p>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or patient ID..."
                  className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredPatients.length > 0 ? (
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Gender</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Last Visit</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">Prescriptions</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-600">{patient.id}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{patient.gender}</td>
                        <td className="py-4 px-4 text-gray-700 hidden sm:table-cell">{patient.phone}</td>
                        <td className="py-4 px-4 text-gray-700 hidden md:table-cell">{patient.lastVisit}</td>
                        <td className="py-4 px-4 text-gray-700 hidden lg:table-cell">{prescriptionCounts[patient.id] || 0}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setSelectedPatient(selectedPatient?.id === patient.id ? null : patient)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {selectedPatient?.id === patient.id ? 'Close' : 'View'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No patients found. Add a new patient to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedPatient ? (
            <PatientDetailsView patient={selectedPatient} />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a patient to view their details</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  );
}
