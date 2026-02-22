"use client";
import { AlertCircle, Clock, FileText, Plus, Users, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Stat } from "../../types/index";

export default function Doctordashboard() {
  const router = useRouter();
  
  const stats: Stat[] = [
    { title: "Today's Prescriptions", value: '24', subtitle: '+3 from yesterday', icon: FileText },
    { title: 'Pending Prescriptions', value: '8', subtitle: 'Awaiting dispensing', icon: Clock },
    { title: 'Total Patients', value: '1,247', subtitle: '+12 this week', icon: Users },
    { title: 'Alerts', value: '3', subtitle: 'Require attention', icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith. Here's your practice summary.</p>
        </div>
        <button 
          onClick={() => router.push('/doctor/addPatients')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isGrowth = stat.subtitle.includes('+');

          return (
            <div key={index} className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <Icon className="w-5 h-5 text-gray-400" />
              </div>

              <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>

              <p className="text-sm flex items-center gap-1">
                 {isGrowth && <TrendingUp className="w-4 h-4 text-green-500" />}
                 <span className={isGrowth ? 'text-green-600' : 'text-gray-500'}>{stat.subtitle}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 mb-6">Frequently used features</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => router.push('/doctor/prescriptions/create')}
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-4 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create Prescription</h3>
              <p className="text-sm text-gray-500">Write a new prescription</p>
            </div>
          </button>
          
          <button 
            onClick={() => router.push('/doctor/patients')}
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-4 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Patient Records</h3>
              <p className="text-sm text-gray-500">View patient history</p>
            </div>
          </button>

          <button 
            onClick={() => router.push('/doctor/prescriptions/history')}
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-4 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Prescription History</h3>
              <p className="text-sm text-gray-500">Review past prescriptions</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
