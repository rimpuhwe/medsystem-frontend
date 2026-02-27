"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Building2, UserCog, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState([
    { name: "Total Clinics", value: "0", icon: Building2, color: "bg-blue-600" },
    { name: "Total Doctors", value: "0", icon: UserCog, color: "bg-green-600" },
    { name: "Total Patients", value: "0", icon: Users, color: "bg-purple-600" },
    { name: "Active Today", value: "0", icon: TrendingUp, color: "bg-orange-600" },
  ])

  useEffect(() => {
    const clinics = JSON.parse(localStorage.getItem('clinics') || '[]')
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]')
    setStats([
      { name: "Total Clinics", value: clinics.length.toString(), icon: Building2, color: "bg-blue-600" },
      { name: "Total Doctors", value: doctors.length.toString(), icon: UserCog, color: "bg-green-600" },
      { name: "Total Patients", value: "0", icon: Users, color: "bg-purple-600" },
      { name: "Active Today", value: "0", icon: TrendingUp, color: "bg-orange-600" },
    ])
  }, [])

  const recentActivity = [
    { action: "New clinic registered", clinic: "City Health Clinic", time: "2 hours ago" },
    { action: "Doctor added", clinic: "Wellness Center", time: "5 hours ago" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Welcome back, Super Admin! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.name}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-3">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-2xl shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shadow-lg"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.clinic}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => router.push('/admin/clinics')} className="flex items-center gap-3 p-5 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 hover:shadow-lg group">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition-colors">
                <Building2 className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <span className="font-semibold text-gray-900">Add Clinic</span>
            </button>
            <button onClick={() => router.push('/admin/doctors')} className="flex items-center gap-3 p-5 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 hover:shadow-lg group">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition-colors">
                <UserCog className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <span className="font-semibold text-gray-900">Add Doctor</span>
            </button>
            <button className="flex items-center gap-3 p-5 border-2 border-purple-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all duration-200 hover:shadow-lg group">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-600 transition-colors">
                <Users className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <span className="font-semibold text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
