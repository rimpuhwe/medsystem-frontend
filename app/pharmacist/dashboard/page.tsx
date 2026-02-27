"use client";

import React, { useState, useEffect } from "react";
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

const COLORS = ["#8b5cf6", "#3b82f6", "#16a34a", "#f59e0b"];

export default function PharmacistDashboard() {
  const router = useRouter();
  const [inventory, setInventory] = useState<any[]>([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalMedicines, setTotalMedicines] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inventory') || '[]');
    setInventory(stored);
    setTotalMedicines(stored.length);
    setLowStockCount(stored.filter((item: any) => item.stock <= 10).length);
  }, []);

  /* ================= KPI DATA ================= */
  const kpis = [
    { title: "Today's Revenue", value: "$1,250", icon: TrendingUp, color: "text-blue-600" },
    { title: "Total Medicines", value: totalMedicines.toString(), icon: Package, color: "text-emerald-600" },
    { title: "Low Stock Items", value: lowStockCount.toString(), icon: AlertTriangle, color: "text-amber-600" },
    { title: "Pending Dispenses", value: "5", icon: ClipboardList, color: "text-purple-600" },
  ];

  /* ================= REVENUE DATA ================= */
  const revenueData = [
    { day: "Mon", revenue: 400 },
    { day: "Tue", revenue: 600 },
    { day: "Wed", revenue: 750 },
    { day: "Thu", revenue: 900 },
    { day: "Fri", revenue: 1100 },
  ];

  /* ================= CATEGORY DATA ================= */
  const categoryData = [
    { name: "Antibiotics", value: 40 },
    { name: "Painkillers", value: 30 },
    { name: "Vitamins", value: 20 },
    { name: "Others", value: 10 },
  ];

  return (
    <div className="space-y-10">

      {/* ================= KPI SECTION ================= */}
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

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Frequently used features
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/pharmacist/dispensing")}
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
            onClick={() => router.push("/pharmacist/Inventory")}
            className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <Package className="w-5 h-5 text-emerald-600" /> Inventory
          </button>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Sales by Category
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ACTIVITY + ALERTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">
            Recent Activity
          </h3>

          <div className="space-y-4 text-sm">
            <ActivityItem
              color="bg-green-500"
              title="Jean Baptiste Nkurunziza"
              subtitle="Prescription dispensed"
              time="2 minutes ago"
            />
            <ActivityItem
              color="bg-yellow-500"
              title="Marie Claire Uwimana"
              subtitle="New prescription scanned"
              time="5 minutes ago"
            />
            <ActivityItem
              color="bg-red-500"
              title="David Mugisha"
              subtitle="Prescription rejected - Allergy alert"
              time="12 minutes ago"
            />
            <ActivityItem
              color="bg-green-500"
              title="Grace Mukamana"
              subtitle="Prescription dispensed"
              time="18 minutes ago"
            />
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">
            System Alerts
          </h3>

          <div className="space-y-4 text-sm">
            <AlertCard
              bg="bg-amber-50"
              title="Low Stock Alert"
              subtitle="Paracetamol 500mg running low (12 units remaining)"
              color="text-amber-600"
            />
            <AlertCard
              bg="bg-green-50"
              title="System Update"
              subtitle="Database backup completed successfully"
              color="text-green-600"
            />
            <AlertCard
              bg="bg-blue-50"
              title="Performance Report"
              subtitle="23% increase in prescription processing speed this week"
              color="text-blue-600"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function ActivityItem({
  color,
  title,
  subtitle,
  time,
}: {
  color: string;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start justify-between bg-gray-50 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <span className={`w-2.5 h-2.5 rounded-full mt-2 ${color}`} />
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

function AlertCard({
  bg,
  title,
  subtitle,
  color,
}: {
  bg: string;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className={`${bg} rounded-lg p-4`}>
      <p className={`font-medium ${color}`}>{title}</p>
      <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
    </div>
  );
}