"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Package,
  AlertTriangle,
  ClipboardList,
  Pill,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#16a34a", "#3b82f6", "#f59e0b", "#8b5cf6"]; // emerald, blue, amber, purple

export default function PharmacistDashboard() {
  const router = useRouter();

  const kpis = [
    { title: "Today's Revenue", value: "$1,250", icon: TrendingUp, color: "text-blue-600" },
    { title: "Total Medicines", value: "320", icon: Package, color: "text-emerald-600" },
    { title: "Low Stock Items", value: "8", icon: AlertTriangle, color: "text-amber-600" },
    { title: "Pending Dispenses", value: "5", icon: ClipboardList, color: "text-purple-600" },
  ];

  const revenueData = [
    { day: "Mon", revenue: 400 },
    { day: "Tue", revenue: 600 },
    { day: "Wed", revenue: 750 },
    { day: "Thu", revenue: 900 },
    { day: "Fri", revenue: 1100 },
  ];

  const categoryData = [
    { name: "Antibiotics", value: 40 },
    { name: "Painkillers", value: 30 },
    { name: "Vitamins", value: 20 },
    { name: "Others", value: 10 },
  ];

  return (
    <div className="space-y-10">

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <Icon className={`w-6 h-6 ${kpi.color}`} />
                <span className="text-2xl font-bold text-gray-900">
                  {kpi.value}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <p className="text-gray-600 mb-6">Frequently used features</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push("/pharmacist/dispense")}
            className="bg-emerald-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-sm"
          >
            <Pill className="w-5 h-5" /> Dispense
          </button>

          <button
            onClick={() => router.push("/pharmacist/report")}
            className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <BarChart3 className="w-5 h-5 text-blue-600" /> Reports
          </button>

          <button
            onClick={() => router.push("/pharmacist/inventory-stock")}
            className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <Package className="w-5 h-5 text-emerald-600" /> Inventory
          </button>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
              <Tooltip />
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div>• John Doe - Amoxicillin - $80</div>
            <div>• Jane Smith - Paracetamol - $25</div>
            <div>• Stock updated: Cetirizine +50 units</div>
          </div>
        </div>
      </div>
  );
}