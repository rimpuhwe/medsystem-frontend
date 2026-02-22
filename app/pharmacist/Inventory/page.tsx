"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const initialInventory = [
  { id: 1, name: "Paracetamol", category: "Painkiller", batch: "B123", expiry: "2026-03-15", stock: 120 },
  { id: 2, name: "Amoxicillin", category: "Antibiotic", batch: "A456", expiry: "2026-02-28", stock: 10 },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [newMed, setNewMed] = useState({ name: "", category: "", batch: "", expiry: "", stock: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
    setInventory([...inventory, { id, ...newMed, stock: Number(newMed.stock) }]);
    setNewMed({ name: "", category: "", batch: "", expiry: "", stock: "" });
  };

  const handleDelete = (id: number) => setInventory(inventory.filter(m => m.id !== id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>

      {/* Add Medicine Form */}
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 items-center">
        <input className="px-2 py-1 border rounded" placeholder="Name" value={newMed.name} onChange={e => setNewMed({...newMed, name:e.target.value})} required />
        <input className="px-2 py-1 border rounded" placeholder="Category" value={newMed.category} onChange={e => setNewMed({...newMed, category:e.target.value})} required />
        <input className="px-2 py-1 border rounded" placeholder="Batch" value={newMed.batch} onChange={e => setNewMed({...newMed, batch:e.target.value})} required />
        <input type="date" className="px-2 py-1 border rounded" value={newMed.expiry} onChange={e => setNewMed({...newMed, expiry:e.target.value})} required />
        <input type="number" className="px-2 py-1 border rounded" placeholder="Stock" value={newMed.stock} onChange={e => setNewMed({...newMed, stock:e.target.value})} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Category</th>
              <th className="p-2 text-left border-b">Batch</th>
              <th className="p-2 text-left border-b">Expiry</th>
              <th className="p-2 text-left border-b">Stock</th>
              <th className="p-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.batch}</td>
                <td className="p-2">{item.expiry}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2 flex gap-2">
                  <button className="p-1 rounded hover:bg-blue-50"><Edit className="w-4 h-4 text-blue-600" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-600" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}