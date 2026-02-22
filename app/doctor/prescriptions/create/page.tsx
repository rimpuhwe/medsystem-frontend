"use client";
import { FileText, Plus, Search, Send, X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "../../../hooks/useToast";
import { ToastContainer } from "../../../../components/Toast";

function PatientFoundView({ patient }: { patient: any }) {
  const { showSuccess } = useToast();
  const [draftPrescriptions, setDraftPrescriptions] = useState<any[]>([]);
  
  useEffect(() => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    if (savedPrescriptions) {
      const prescriptions = JSON.parse(savedPrescriptions);
      const drafts = prescriptions.filter((p: any) => p.patientId === patient.id && p.status === 'pending');
      setDraftPrescriptions(drafts);
    }
  }, [patient.id]);

  const activatePrescription = (prescriptionId: string) => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    if (savedPrescriptions) {
      const prescriptions = JSON.parse(savedPrescriptions);
      const updatedPrescriptions = prescriptions.map((p: any) => 
        p.id === prescriptionId ? { ...p, status: 'active' } : p
      );
      localStorage.setItem('prescriptions', JSON.stringify(updatedPrescriptions));
      setDraftPrescriptions(prev => prev.filter(p => p.id !== prescriptionId));
      showSuccess('Prescription activated and sent to history!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">Patient Found</h3>
        <p className="text-green-700"><strong>Name:</strong> {patient.name}</p>
        <p className="text-green-700"><strong>ID:</strong> {patient.id}</p>
        <p className="text-green-700"><strong>Gender:</strong> {patient.gender}</p>
        <p className="text-green-700"><strong>Phone:</strong> {patient.phone}</p>
      </div>
      
      {draftPrescriptions.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-3">Draft Prescriptions ({draftPrescriptions.length})</h4>
          <div className="space-y-3">
            {draftPrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white p-3 rounded border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{prescription.id} - {prescription.diagnosis}</p>
                    <p className="text-xs text-gray-600">{prescription.date} • {prescription.medicines?.length || 0} medicines</p>
                  </div>
                  <button
                    onClick={() => activatePrescription(prescription.id)}
                    className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface CreatePrescriptionProps {}

function CreatePrescription({}: CreatePrescriptionProps) {
  const { showSuccess, showError, showInfo, toasts, removeToast } = useToast();
  const [patientId, setPatientId] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [foundPatient, setFoundPatient] = useState<any>(null);
  const [currentMedicine, setCurrentMedicine] = useState<Omit<Medicine, 'id'>>({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const addMedicine = () => {
    if (currentMedicine.name && currentMedicine.dosage && currentMedicine.frequency && currentMedicine.duration && currentMedicine.instructions) {
      const newMedicine: Medicine = {
        ...currentMedicine,
        id: Date.now().toString()
      };
      setMedicines([...medicines, newMedicine]);
      setCurrentMedicine({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
      showSuccess('Medicine added successfully!');
    }
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleMedicineChange = (field: keyof Omit<Medicine, 'id'>, value: string) => {
    setCurrentMedicine(prev => ({ ...prev, [field]: value }));
  };

  const searchPatient = () => {
    if (!patientId.trim()) {
      showError('Please enter a Patient ID to search.');
      return;
    }

    const savedPatients = localStorage.getItem('patients');
    let patients = [];
    
    // Default patients if none exist
    const defaultPatients = [
      { id: 'PAT-001', name: 'John Doe', gender: 'Male', phone: '+1 (555) 123-4567', email: 'j.doe@gmail.com', lastVisit: '1/15/2024' },
      { id: 'PAT-002', name: 'Sarah Wilson', gender: 'Female', phone: '+1 (555) 234-5678', email: 's.wilson@gmail.com', lastVisit: '1/18/2024' },
    ];
    
    if (savedPatients) {
      try {
        patients = JSON.parse(savedPatients);
      } catch (error) {
        console.error('Failed to parse patients data:', error);
        localStorage.removeItem('patients');
        patients = defaultPatients;
        localStorage.setItem('patients', JSON.stringify(defaultPatients));
      }
    } else {
      patients = defaultPatients;
      localStorage.setItem('patients', JSON.stringify(defaultPatients));
    }
    
    const patient = patients.find((p: any) => p.id.toLowerCase() === patientId.toLowerCase());
    if (patient) {
      setFoundPatient(patient);
      showSuccess(`Patient ${patient.name} found!`);
    } else {
      setFoundPatient(null);
      showError(`Patient with ID "${patientId}" not found. Try PAT-001 or PAT-002.`);
    }
  };

  const savePrescription = (isDraft: boolean = false) => {
    if (!foundPatient || !diagnosis.trim() || medicines.length === 0) {
      showError('Please search for a valid patient, add diagnosis, and at least one medicine.');
      return;
    }
    
    try {
      const prescriptionId = `PRX-${Date.now().toString().slice(-6)}`;
      const prescriptionData = {
        id: prescriptionId,
        patientId: foundPatient.id,
        patientName: foundPatient.name,
        date: new Date().toLocaleDateString(),
        diagnosis,
        notes: '',
        medicines,
        status: isDraft ? 'pending' : 'active'
      };
      
      const savedData = localStorage.getItem('prescriptions');
      let existingPrescriptions = [];
      
      if (savedData) {
        try {
          existingPrescriptions = JSON.parse(savedData);
        } catch (parseError) {
          console.error('Failed to parse prescriptions, starting fresh:', parseError);
          localStorage.removeItem('prescriptions');
        }
      }
      
      existingPrescriptions.push(prescriptionData);
      localStorage.setItem('prescriptions', JSON.stringify(existingPrescriptions));
      
      showSuccess(`Prescription ${isDraft ? 'saved as draft' : 'created and sent'} with ID: ${prescriptionId}`);
      setPatientId(''); setDiagnosis(''); setMedicines([]); setFoundPatient(null);
    } catch (error) {
      console.error('Failed to save prescription:', error);
      showError('Failed to save prescription. Please try again.');
    }
  };

  return (
    <>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Create New Prescription</h1>
        <p className="text-gray-600">Create and send prescriptions to patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Information</h2>
          <p className="text-gray-600 text-sm mb-6">Search for patient by ID</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchPatient()}
              placeholder="Enter Patient ID (e.g., PAT-001)"
              className="flex-1 px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               required
            />
            <button 
              onClick={searchPatient}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {foundPatient && (
          <PatientFoundView patient={foundPatient} />
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Diagnosis & Notes</h2>
          <p className="text-gray-600 text-sm mb-6">Enter diagnosis and additional notes</p>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis, symptoms, and additional notes..."
            className="w-full h-32 px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
             required
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Prescription Medicines</h2>
        <p className="text-gray-600 text-sm mb-6">Add medicines to the prescription with dosage and instructions</p>
        
        {/* Added Medicines List */}
        {medicines.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Added Medicines ({medicines.length})</h3>
            <div className="space-y-3">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{medicine.name}</div>
                    <div className="text-sm text-gray-600">
                      {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                      {medicine.instructions && ` • ${medicine.instructions}`}
                    </div>
                  </div>
                  <button
                    onClick={() => removeMedicine(medicine.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Medicine Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-900">
            Add Medicine
            <Plus className="w-5 h-5 text-blue-600" />
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  value={currentMedicine.name}
                  onChange={(e) => handleMedicineChange('name', e.target.value)}
                  placeholder="e.g., Amoxicillin"
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  value={currentMedicine.dosage}
                  onChange={(e) => handleMedicineChange('dosage', e.target.value)}
                  placeholder="e.g., 500mg"
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={currentMedicine.frequency}
                  onChange={(e) => handleMedicineChange('frequency', e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select frequency</option>
                  <option value="once-daily">Once Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="three-times-daily">Three Times Daily</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={currentMedicine.duration}
                  onChange={(e) => handleMedicineChange('duration', e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select duration</option>
                  <option value="3-days">3 days</option>
                  <option value="5-days">5 days</option>
                  <option value="7-days">7 days</option>
                  <option value="14-days">14 days</option>
                  <option value="30-days">30 days</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
              <input
                type="text"
                value={currentMedicine.instructions}
                onChange={(e) => handleMedicineChange('instructions', e.target.value)}
                placeholder="e.g., take with food"
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button 
              onClick={addMedicine}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Medicine
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button 
          onClick={() => savePrescription(true)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
        >
          <FileText className="w-5 h-5" />
          Save as Draft ({medicines.length} medicines)
        </button>
        <button 
          onClick={() => savePrescription(false)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-5 h-5" />
          Save and Send ({medicines.length} medicines)
        </button>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  );
}

export default CreatePrescription;