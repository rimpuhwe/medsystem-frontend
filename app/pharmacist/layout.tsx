"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { ToastContainer } from "../../components/Toast";
import { useToast } from "../hooks/useToast";

export default function PharmacistLayout({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToast();

  return (
    <div className="flex h-screen bg-gray-50">
    
      <Sidebar dashboardType="pharmacist" />

      <div className="flex-1 overflow-auto lg:ml-0">
        <Header dashboardType="pharmacist" />
        <main className="p-4 lg:p-8">{children}</main>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}