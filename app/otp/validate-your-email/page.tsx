'use client';

import React, { useState } from "react";

export default function OtpValidationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    // TODO: Validate OTP with backend
    alert("OTP submitted: " + otp.join(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-12 h-12 text-2xl text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 mb-2 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Didn't receive the code?</span>{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={() => alert("Resend OTP functionality coming soon!")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
