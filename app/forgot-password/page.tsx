"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetOTP", otp);
      console.log("OTP sent to email:", otp); // In production, send via email API
      router.push("/verify-otp");
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#090A0A" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <button onClick={() => router.push("/login")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(45deg, #0ea5e9 0%, #06b6d4 100%)", width: "66px", height: "66px" }}>
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-blue-500 mb-2">Forgot Password?</h1>
            <p className="text-gray-600 text-sm">Enter your email to receive an OTP</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50 transition-all shadow-lg"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
