'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

type UserType = 'patient' | 'pharmacist';

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('patient');
  const [step, setStep] = useState(1);

  const isPatient = userType === 'patient';

  const theme = {
    primary: isPatient ? '#2f5daa' : '#22c55e',
    gradientFrom: isPatient ? '#2f5daa' : '#22c55e',
    gradientTo: isPatient ? '#244a8f' : '#16a34a',
    border: isPatient ? '#93c5fd' : '#86efac',
    buttonFrom: isPatient ? '#4c7cf3' : '#4ade80',
    buttonTo: isPatient ? '#3c63c7' : '#22c55e',
  };

  const totalSteps = isPatient ? 3 : 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const data = {
      fullName: form.fullName?.value,
      email: form.email?.value,
      password: form.password?.value,
      phone: form.phone?.value,
      license: form.license?.value,
      pharmacyName: form.pharmacyName?.value,
      userType,
    };

    console.log(data);

    // KEEP YOUR API INTEGRATION HERE
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] px-4">

      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden flex">

        {/* LEFT DIAGONAL BACKGROUND */}
        <div
          className="absolute left-0 top-0 w-[65%] h-full transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientTo})`,
            clipPath: 'polygon(0 0, 82% 0, 64% 100%, 0% 100%)',
          }}
        />

        {/* LEFT CONTENT */}
        <div className="w-1/2 flex flex-col justify-center items-center text-white z-10">

          <div className="text-center">

            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4" />

            <h1 className="font-bold text-xl">NSOC DASHBOARD</h1>

            <p className="text-white/80 text-sm mt-2">
              {isPatient
                ? 'Patient Registration'
                : 'Pharmacist Registration'}
            </p>

            {/* STEP INDICATOR */}
            <div className="flex gap-2 mt-6 justify-center">

              {[...Array(totalSteps)].map((_, i) => {

                const active = step === i + 1;

                return (
                  <div
                    key={i}
                    className="w-8 h-2 rounded-full"
                    style={{
                      backgroundColor: active
                        ? '#fff'
                        : 'rgba(255,255,255,0.4)',
                    }}
                  />
                );

              })}

            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 flex items-center justify-center z-10">

          <div className="w-[340px]">

            {/* USER TYPE SELECT */}
            <div className="flex gap-3 mb-4">

              <button
                type="button"
                onClick={() => {
                  setUserType('patient');
                  setStep(1);
                }}
                className="flex-1 py-2 rounded text-sm font-semibold"
                style={{
                  background: isPatient ? theme.primary : '#e5e7eb',
                  color: isPatient ? '#fff' : '#374151',
                }}
              >
                Patient
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserType('pharmacist');
                  setStep(1);
                }}
                className="flex-1 py-2 rounded text-sm font-semibold"
                style={{
                  background: !isPatient ? theme.primary : '#e5e7eb',
                  color: !isPatient ? '#fff' : '#374151',
                }}
              >
                Pharmacist
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <Input label="Full Name" name="fullName" theme={theme} />
                  <Input label="Email" name="email" theme={theme} />
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <Input label="Phone Number" name="phone" theme={theme} />
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && isPatient && (
                <>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    theme={theme}
                  />
                </>
              )}

              {/* PHARMACIST EXTRA STEP */}
              {step === 3 && !isPatient && (
                <>
                  <Input
                    label="Pharmacy Name"
                    name="pharmacyName"
                    theme={theme}
                  />
                  <Input
                    label="License Number"
                    name="license"
                    theme={theme}
                  />
                </>
              )}

              {/* PHARMACIST PASSWORD */}
              {step === 4 && !isPatient && (
                <>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    theme={theme}
                  />
                </>
              )}

              {/* NAVIGATION */}
              <div className="flex gap-3 pt-2">

                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-2 border rounded text-sm"
                  >
                    Back
                  </button>
                )}

                {step < totalSteps && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-2 text-white rounded"
                    style={{
                      background: theme.primary,
                    }}
                  >
                    Continue
                  </button>
                )}

                {step === totalSteps && (
                  <button
                    type="submit"
                    className="flex-1 py-2 text-white rounded font-semibold"
                    style={{
                      background: `linear-gradient(to right, ${theme.buttonFrom}, ${theme.buttonTo})`,
                    }}
                  >
                    Register
                  </button>
                )}

              </div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border py-2 rounded flex items-center justify-center gap-2 text-sm"
              >
                <FcGoogle />
                Continue with Google
              </button>

            </form>

            <p className="text-center text-sm mt-4">

              Already have an account?{' '}

              <Link
                href="/my-account/login"
                style={{ color: theme.primary }}
                className="font-semibold"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;

/* INPUT COMPONENT */

function Input({
  label,
  name,
  theme,
  type = 'text',
}: any) {
  return (
    <div>
      <label className="text-gray-600 text-sm block mb-1">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required
        className="w-full px-3 py-2 rounded border outline-none text-sm"
        style={{
          borderColor: theme.border,
        }}
      />
    </div>
  );
}