
export interface Patient {
  id: string;
  name: string;
  gender: string;
  phone: string;
  email: string; 
  lastVisit: string;
  prescriptions: number;
}



export interface Stat {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}

export type PageType = 'dashboard' | 'create-prescription' | 'patient-records' | 'prescription-history' | 'settings' | 'add-patient' | 'profile' | 'queue' ;

export interface QueuePatient {
  id: string;
  name: string;
  appointmentTime: string;
  reason: string;
  status: 'waiting' | 'in-consultation' | 'completed';
  queueNumber: number;
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  diagnosis: string;
  notes: string;
  medicines: Medicine[];
  status: 'active' | 'pending' | 'completed';
}

interface DoctorProfile {
  fullName: string;
  email: string;
  phone: string;
  license: string;
  specialization: string;
  bio: string;
}

interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Update Patient interface to include email
