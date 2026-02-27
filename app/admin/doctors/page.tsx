"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { UserCog, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"

type Doctor = {
  id: number
  name: string
  specialty: string
  clinic: string
  phone: string
  email: string
  password: string
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", specialty: "", clinic: "", phone: "", email: "", password: "" })
  const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({})
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newDoctorPassword, setNewDoctorPassword] = useState("")

  const generatePassword = () => "Doctor@123"

  useEffect(() => {
    const stored = localStorage.getItem('doctors')
    if (stored) {
      setDoctors(JSON.parse(stored))
    } else {
      const initial = [
        { id: 1, name: "Dr. John Doe", specialty: "Cardiology", clinic: "City Health Clinic", phone: "+250 788 111 222", email: "john@health.rw", password: "Doctor@123" },
        { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrics", clinic: "Wellness Center", phone: "+250 788 333 444", email: "jane@wellness.rw", password: "Doctor@123" },
      ]
      localStorage.setItem('doctors', JSON.stringify(initial))
      setDoctors(initial)
    }
  }, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const updated = doctors.map(d => d.id === editingId ? { ...d, name: formData.name, specialty: formData.specialty, clinic: formData.clinic, phone: formData.phone, email: formData.email } : d)
      setDoctors(updated)
      localStorage.setItem('doctors', JSON.stringify(updated))
      setEditingId(null)
      setFormData({ name: "", specialty: "", clinic: "", phone: "", email: "", password: "" })
      setShowForm(false)
    } else {
      const newDoctor = { id: Date.now(), ...formData }
      const updated = [...doctors, newDoctor]
      setDoctors(updated)
      localStorage.setItem('doctors', JSON.stringify(updated))
      setNewDoctorPassword(formData.password)
      setFormData({ name: "", specialty: "", clinic: "", phone: "", email: "", password: "" })
      setShowForm(false)
      setShowPasswordModal(true)
    }
  }

  const handleEdit = (doctor: Doctor) => {
    setEditingId(doctor.id)
    setFormData({ name: doctor.name, specialty: doctor.specialty, clinic: doctor.clinic, phone: doctor.phone, email: doctor.email, password: "" })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    const updated = doctors.filter(d => d.id !== id)
    setDoctors(updated)
    localStorage.setItem('doctors', JSON.stringify(updated))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor Account Created</h3>
              <p className="text-gray-600 mb-4">The doctor account has been created successfully. Please share these login credentials:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Email:</span> {formData.email || doctors[doctors.length - 1]?.email}</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Password:</span> <span className="font-mono bg-white px-2 py-1 rounded">{newDoctorPassword}</span></p>
              </div>
              <p className="text-xs text-gray-500 mb-4">⚠️ Make sure to save this password. The doctor should change it after first login.</p>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctors Management</h2>
            <p className="text-gray-600 mt-1">Manage all registered doctors</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Doctor
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h3>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Clinic"
                value={formData.clinic}
                onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                required
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <input
                type="email"
                className="px-4 py-2 border rounded-lg"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {!editingId && (
                <input
                  type="password"
                  className="px-4 py-2 border rounded-lg"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              )}
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  {editingId ? 'Update Doctor' : 'Add Doctor'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ name: "", specialty: "", clinic: "", phone: "", email: "", password: "" }) }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clinic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{doctor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doctor.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doctor.clinic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doctor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-700">
                        {showPasswords[doctor.id] ? doctor.password : "••••••••"}
                      </span>
                      <button
                        onClick={() => setShowPasswords({ ...showPasswords, [doctor.id]: !showPasswords[doctor.id] })}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {showPasswords[doctor.id] ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(doctor)} className="p-1 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(doctor.id)} className="p-1 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}