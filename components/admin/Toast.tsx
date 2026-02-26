"use client"

import { CheckCircle, XCircle, X } from "lucide-react"
import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}>
        {type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
