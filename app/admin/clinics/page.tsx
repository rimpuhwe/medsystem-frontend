"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Building2, Plus, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

type Clinic = {
  id: number
  name: string
  location: string
  phone: string
  email: string
  services: string[]
}

export default function ClinicsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", location: "", phone: "", email: "", services: "" })

  const serviceOptions = ["General Medicine", "Pediatrics", "Gynecology", "Cardiology", "Orthopedics", "Dermatology", "Neurology", "Oncology", "Psychiatry", "Radiology"]

  useEffect(() => {
    const stored = localStorage.getItem('clinics')
    if (stored) {
      setClinics(JSON.parse(stored))
    } else {
      const initial = [
        { id: 1, name: "City Health Clinic", location: "Kigali, Rwanda", phone: "+250 788 123 456", email: "city@health.rw", services: ["General Medicine", "Pediatrics", "Gynecology"] },
        { id: 2, name: "Wellness Center", location: "Musanze, Rwanda", phone: "+250 788 654 321", email: "wellness@center.rw", services: ["Cardiology", "Orthopedics", "Dermatology"] },
      ]
      localStorage.setItem('clinics', JSON.stringify(initial))
      setClinics(initial)
    }
  }, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const servicesArray = formData.services.split(',').map(s => s.trim()).filter(s => s)
    
    if (editingId) {
      const updated = clinics.map(c => c.id === editingId ? { ...c, name: formData.name, location: formData.location, phone: formData.phone, email: formData.email, services: servicesArray } : c)
      setClinics(updated)
      localStorage.setItem('clinics', JSON.stringify(updated))
      setEditingId(null)
    } else {
      const newClinic = { id: Date.now(), name: formData.name, location: formData.location, phone: formData.phone, email: formData.email, services: servicesArray }
      const updated = [...clinics, newClinic]
      setClinics(updated)
      localStorage.setItem('clinics', JSON.stringify(updated))
    }
    
    setFormData({ name: "", location: "", phone: "", email: "", services: "" })
    setShowForm(false)
  }

  const handleEdit = (clinic: Clinic) => {
    setEditingId(clinic.id)
    setFormData({ name: clinic.name, location: clinic.location, phone: clinic.phone, email: clinic.email, services: clinic.services.join(', ') })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    const updated = clinics.filter(c => c.id !== id)
    setClinics(updated)
    localStorage.setItem('clinics', JSON.stringify(updated))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clinics Management</h2>
            <p className="text-gray-600 mt-1">Manage all registered clinics</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Clinic
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Edit Clinic' : 'Add New Clinic'}</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="px-4 py-2 border rounded-lg"
                  placeholder="Clinic Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  className="px-4 py-2 border rounded-lg"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services (comma-separated)</label>
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., General Medicine, Pediatrics, Gynecology"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Available: {serviceOptions.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  {editingId ? 'Update Clinic' : 'Add Clinic'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ name: "", location: "", phone: "", email: "", services: "" }) }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clinic Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clinics.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{clinic.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{clinic.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {clinic.services.map((service, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{service}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{clinic.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{clinic.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(clinic)} className="p-1 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(clinic.id)} className="p-1 hover:bg-red-50 rounded">
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