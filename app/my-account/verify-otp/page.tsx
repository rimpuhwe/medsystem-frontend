'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const VerifyOtpPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* ===========================
     LOAD EMAIL FROM STORAGE
  ============================ */
  useEffect(() => {
    const storedEmail = localStorage.getItem('pendingVerificationEmail');

    if (!storedEmail) {
      router.push('/my-account/login');
      return;
    }

    setEmail(storedEmail);
    inputsRef.current[0]?.focus();
  }, [router]);

  /* ===========================
     HANDLE INPUT
  ============================ */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ===========================
     VERIFY OTP
  ============================ */
  const handleVerify = async () => {
    setError(null);
    setSuccess(null);

    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://medsystemapplication.onrender.com/api/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            otp: otpValue,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Invalid OTP.');
      }

      setSuccess('Email verified successfully! Redirecting...');

      localStorage.removeItem('pendingVerificationEmail');

      setTimeout(() => {
        router.push('/my-account/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h1>

        <p className="text-sm text-gray-500 text-center mb-2">
          Enter the 6-digit OTP sent to
        </p>

        <p className="text-center font-medium text-gray-700 mb-6 break-all">
          {email}
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded border border-red-300 mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 text-sm p-2 rounded border border-green-300 mb-4">
            {success}
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;