"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Bell } from "lucide-react";

const initialInventory = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Painkiller",
    batch: "B123",
    expiry: "2026-03-15",
    stock: 120,
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    batch: "A456",
    expiry: "2026-02-28",
    stock: 10,
  },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [newMed, setNewMed] = useState({
    name: "",
    category: "",
    batch: "",
    expiry: "",
    stock: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [editMed, setEditMed] = useState<any>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showAddStockId, setShowAddStockId] = useState<number | null>(null);
  const [addStockValue, setAddStockValue] = useState(0);

  // Notification logic
  useEffect(() => {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(now.getDate() + 15);
    const notifs: string[] = [];
    inventory.forEach((med) => {
      if (med.stock <= 10) {
        notifs.push(`Low stock: ${med.name} (${med.stock} left)`);
      }
      if (new Date(med.expiry) <= soon && new Date(med.expiry) >= now) {
        notifs.push(`Expiring soon: ${med.name} (expires ${med.expiry})`);
      }
    });
    setNotifications(notifs);
  }, [inventory]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
    setInventory([
      ...inventory,
      { id, ...newMed, stock: Number(newMed.stock) },
    ]);
    setNewMed({ name: "", category: "", batch: "", expiry: "", stock: "" });
  };

  const handleDelete = (id: number) =>
    setInventory(inventory.filter((m) => m.id !== id));

  const handleEdit = (med: any) => {
    setEditId(med.id);
    setEditMed({ ...med });
  };

  const handleEditSave = () => {
    setInventory(
      inventory.map((m) =>
        m.id === editId ? { ...editMed, stock: Number(editMed.stock) } : m,
      ),
    );
    setEditId(null);
    setEditMed(null);
  };

  const handleAddStock = (id: number) => {
    setInventory(
      inventory.map((m) =>
        m.id === id ? { ...m, stock: m.stock + addStockValue } : m,
      ),
    );
    setShowAddStockId(null);
    setAddStockValue(0);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">
          Inventory Management
        </h1>
        <div className="relative">
          <Bell className="w-7 h-7 text-blue-600" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4">
          <ul className="list-disc pl-5 text-yellow-800 space-y-1">
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Medicine Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col md:flex-row gap-2 items-center bg-blue-50 p-4 rounded-lg shadow"
      >
        <input
          className="px-2 py-1 border rounded w-32"
          placeholder="Name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          required
        />
        <input
          className="px-2 py-1 border rounded w-32"
          placeholder="Category"
          value={newMed.category}
          onChange={(e) => setNewMed({ ...newMed, category: e.target.value })}
          required
        />
        <input
          className="px-2 py-1 border rounded w-24"
          placeholder="Batch"
          value={newMed.batch}
          onChange={(e) => setNewMed({ ...newMed, batch: e.target.value })}
          required
        />
        <input
          type="date"
          className="px-2 py-1 border rounded w-36"
          value={newMed.expiry}
          onChange={(e) => setNewMed({ ...newMed, expiry: e.target.value })}
          required
        />
        <input
          type="number"
          className="px-2 py-1 border rounded w-20"
          placeholder="Stock"
          value={newMed.stock}
          onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })}
          required
          min={0}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </form>

      {/* Inventory Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
          <thead className="bg-blue-100">
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
            {inventory.map((item) => {
              const isLowStock = item.stock <= 10;
              const isExpiring = (() => {
                const now = new Date();
                const soon = new Date(now);
                soon.setDate(now.getDate() + 15);
                return (
                  new Date(item.expiry) <= soon && new Date(item.expiry) >= now
                );
              })();
              return (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50 ${isLowStock ? "bg-red-50" : isExpiring ? "bg-yellow-50" : ""}`}
                >
                  {editId === item.id ? (
                    <>
                      <td className="p-2">
                        <input
                          className="border rounded px-2 py-1 w-28"
                          value={editMed.name}
                          onChange={(e) =>
                            setEditMed({ ...editMed, name: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <input
                          className="border rounded px-2 py-1 w-28"
                          value={editMed.category}
                          onChange={(e) =>
                            setEditMed({ ...editMed, category: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <input
                          className="border rounded px-2 py-1 w-20"
                          value={editMed.batch}
                          onChange={(e) =>
                            setEditMed({ ...editMed, batch: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="date"
                          className="border rounded px-2 py-1 w-32"
                          value={editMed.expiry}
                          onChange={(e) =>
                            setEditMed({ ...editMed, expiry: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="border rounded px-2 py-1 w-16"
                          value={editMed.stock}
                          onChange={(e) =>
                            setEditMed({ ...editMed, stock: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2 flex gap-2">
                        <button
                          onClick={handleEditSave}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditMed(null);
                          }}
                          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 font-medium">{item.name}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.batch}</td>
                      <td className="p-2">{item.expiry}</td>
                      <td className="p-2">
                        <span
                          className={`font-semibold ${isLowStock ? "text-red-600" : isExpiring ? "text-yellow-700" : "text-green-700"}`}
                        >
                          {item.stock}
                        </span>
                        <button
                          onClick={() => {
                            setShowAddStockId(item.id);
                            setAddStockValue(0);
                          }}
                          className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-200"
                        >
                          Add Stock
                        </button>
                        {showAddStockId === item.id && (
                          <span className="ml-2 flex items-center gap-1">
                            <input
                              type="number"
                              min={1}
                              className="border rounded px-1 py-0.5 w-14"
                              value={addStockValue}
                              onChange={(e) =>
                                setAddStockValue(Number(e.target.value))
                              }
                            />
                            <button
                              onClick={() => handleAddStock(item.id)}
                              className="bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-700"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => setShowAddStockId(null)}
                              className="bg-gray-200 px-2 py-0.5 rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </span>
                        )}
                      </td>
                      <td className="p-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 rounded hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
