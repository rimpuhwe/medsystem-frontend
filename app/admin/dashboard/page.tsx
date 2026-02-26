"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Building2, UserCog, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { name: "Total Clinics", value: "2", icon: Building2, color: "bg-blue-600" },
    { name: "Total Doctors", value: "2", icon: UserCog, color: "bg-green-600" },
    { name: "Total Patients", value: "0", icon: Users, color: "bg-purple-600" },
    { name: "Active Today", value: "0", icon: TrendingUp, color: "bg-orange-600" },
  ]

  const recentActivity = [
    { action: "New clinic registered", clinic: "City Health Clinic", time: "2 hours ago" },
    { action: "Doctor added", clinic: "Wellness Center", time: "5 hours ago" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Welcome back, Super Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Add Clinic</span>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors">
              <UserCog className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Add Doctor</span>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
