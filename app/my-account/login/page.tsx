"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create payload matching backend request
      const payload = {
        identifier: email, // email from UI
        password: password,
      };

      const response = await fetch(
        "https://medsystemapplication.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { Token, Role, Message } = data;

      // Store token, role, and referenceNumber
      const token = localStorage.setItem("token", Token);
      const role = localStorage.setItem("role", Role);
      if (Message) {
        localStorage.setItem("message", Message);
      }
      // fetch("https://medsystemapplication.onrender.com/api/doctor/dashboard", {
      //   headers: {
      //     Authorization: `Bearer ${Token}`,
      //   },
      // });


      // Redirect based on role
      switch (Role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "DOCTOR":
          router.push("/doctor/dashboard");
          break;
        case "PATIENT":
          router.push("/patient/dashboard");
          break;
        case "PHARMACIST":
          router.push("/pharmacist/dashboard");
          break;
        default:
          router.push("/my-account/login");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] px-4">
      <div className="relative w-full max-w-5xl h-[540px] bg-white rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-[#f5f7fa] flex flex-col items-center justify-center z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-[#2f5daa]" />
            </div>
            <h1 className="text-[#2f5daa] font-bold text-2xl tracking-wide">
              Secure access to your healthcare dashboard.
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Welcome back to Digital Medical Ordinance System. Please login to
              your account
            </p>
          </div>
        </div>

        {/* Blue Background */}
        <div
          className="absolute right-0 top-0 w-[65%] h-full
          bg-gradient-to-br from-[#2f5daa] to-[#244a8f]
          [clip-path:polygon(18%_0,100%_0,100%_100%,0%_100%)]"
        />

        {/* Right Side Form */}
        <div className="w-1/2 flex items-center justify-center relative z-10">
          <div className="w-[320px]">
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="text-white/80 text-sm block mb-1">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded bg-white text-sm outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-white/80 text-sm block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 rounded bg-white text-sm outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember + Recover */}
              <div className="flex justify-between items-center text-sm text-white/80">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-500" />
                  Remember me
                </label>
                <a href="#" className="text-blue-200 hover:underline">
                  Recover password
                </a>
              </div>

              {/* Sign In */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded bg-gradient-to-r from-[#4c7cf3] to-[#3c63c7] text-white font-semibold text-sm hover:brightness-110 transition"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 text-white">OR CONTINUE WITH</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-gray-700 py-2 rounded flex items-center justify-center gap-3 hover:bg-gray-100 transition text-sm font-medium"
              >
                <FcGoogle size={20} /> Continue with Google
              </button>
            </form>

            <p className="text-center text-white/80 text-sm mt-5">
              Don't have an account?{" "}
              <Link
                href="/my-account/register"
                className="text-white font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
