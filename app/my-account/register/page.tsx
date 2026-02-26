'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

type UserType = 'patient' | 'pharmacist';

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [userType, setUserType] = useState<UserType>('patient');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPatient = userType === 'patient';
  const totalSteps = 3;

  // ✅ CENTRALIZED FORM STATE (FIXES NULL PAYLOAD ISSUE)
  const [formValues, setFormValues] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (userType === 'patient') {
        const payload = {
          fullName: formValues.beneficiaryName,
          email: formValues.email,
          phone: formValues.patientPhone,
          password: formValues.password,
          gender: formValues.patientGender,
          dateOfBirth: new Date(formValues.dateOfBirth).toISOString(),
          insurance: formValues.insuranceProvider,
          insuranceNumber: formValues.insuranceNumber,
          insuranceHolder: formValues.insuranceHolder,
          holderEmployer: formValues.holderEmployer,
        };

        const res = await fetch(
          'https://medsystemapplication.onrender.com/api/auth/register/patient',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || 'Patient registration failed');
        }

        localStorage.setItem('pendingVerificationEmail', payload.email);
        router.push('/my-account/verify-otp');
      } else {
        const payload = {
          fullName: formValues.pharmacistName,
          email: formValues.email,
          phone: formValues.pharmacistPhone,
          password: formValues.password,
          gender: formValues.pharmacistGender,
          pharmacyName: formValues.pharmacyName,
          licenseNumber: formValues.licenseNumber,
        };

        const res = await fetch(
          'https://medsystemapplication.onrender.com/api/auth/register/pharmacy',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || 'Pharmacist registration failed');
        }

        localStorage.setItem('pendingVerificationEmail', payload.email);
        router.push('/my-account/verify-otp');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    primary: isPatient ? '#2f5daa' : '#22c55e',
    gradientFrom: isPatient ? '#2f5daa' : '#22c55e',
    gradientTo: isPatient ? '#244a8f' : '#16a34a',
    border: isPatient ? '#93c5fd' : '#86efac',
    buttonFrom: isPatient ? '#4c7cf3' : '#4ade80',
    buttonTo: isPatient ? '#3c63c7' : '#22c55e',
  };
  const handleGoogleSignIn = () => {
    console.log('Google Sign-In Clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] px-4">
      <div className="relative w-full max-w-5xl h-[650px] bg-white rounded-md shadow-xl overflow-hidden flex border border-gray-200">

        {/* LEFT PANEL */}
        <div
          className="absolute left-0 top-0 w-[65%] h-full transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientTo})`,
            clipPath: 'polygon(0 0, 82% 0, 64% 100%, 0% 100%)',
          }}
        />

        <div className="w-1/2 flex flex-col justify-center items-center text-white z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4" />
            <h1 className="font-bold text-xl">
              {isPatient ? 'Patient Registration' : 'Pharmacist Registration'}
            </h1>
            <p className="text-white/80 text-sm mt-2">
              Step {step} of {totalSteps}
            </p>

            <div className="flex gap-2 mt-6 justify-center">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="w-10 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      step >= s ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 flex items-center justify-center z-10">
          <div className="w-[360px]">

            {/* USER TYPE SWITCH */}
            <div className="flex gap-3 mb-5">
              <button
                type="button"
                onClick={() => { setUserType('patient'); setStep(1); }}
                className="flex-1 py-2 rounded font-semibold text-sm"
                style={{
                  background: isPatient ? theme.primary : '#e5e7eb',
                  color: isPatient ? '#fff' : '#374151',
                }}
              >
                Patient
              </button>

              <button
                type="button"
                onClick={() => { setUserType('pharmacist'); setStep(1); }}
                className="flex-1 py-2 rounded font-semibold text-sm"
                style={{
                  background: !isPatient ? theme.primary : '#e5e7eb',
                  color: !isPatient ? '#fff' : '#374151',
                }}
              >
                Pharmacist
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {error && (
                <div className="bg-red-100 text-red-600 text-sm p-2 rounded border border-red-300">
                  {error}
                </div>
              )}



              {/* PATIENT STEPS */}
              {isPatient && step === 1 && (
                <>
                  <Input label="Full Name" name="beneficiaryName" value={formValues.beneficiaryName} onChange={handleChange} theme={theme} />
                  <Input label="Phone" name="patientPhone" value={formValues.patientPhone} onChange={handleChange} theme={theme} />
                  <Input label="Date of Birth" type="date" name="dateOfBirth" value={formValues.dateOfBirth} onChange={handleChange} theme={theme} />
                  <Select name="patientGender" value={formValues.patientGender} onChange={handleChange} theme={theme} />
                </>
              )}

              {isPatient && step === 2 && (
                <>
                  <Input label="Insurance Provider" name="insuranceProvider" value={formValues.insuranceProvider} onChange={handleChange} theme={theme} />
                  <Input label="Insurance Number" name="insuranceNumber" value={formValues.insuranceNumber} onChange={handleChange} theme={theme} />
                  <Input label="Insurance Holder" name="insuranceHolder" value={formValues.insuranceHolder} onChange={handleChange} theme={theme} />
                  <Input label="Holder Employer" name="holderEmployer" value={formValues.holderEmployer} onChange={handleChange} theme={theme} />
                </>
              )}


              {/* PHARMACIST STEPS */}
              {!isPatient && step === 1 && (
                <>
                  <Input label="Full Name" name="pharmacistName" value={formValues.pharmacistName} onChange={handleChange} theme={theme} />
                  <Select name="pharmacistGender" value={formValues.pharmacistGender} onChange={handleChange} theme={theme} />
                  <Input label="Phone" name="pharmacistPhone" value={formValues.pharmacistPhone} onChange={handleChange} theme={theme} />
                </>
              )}

              {!isPatient && step === 2 && (
                <>
                  <Input label="Pharmacy Name" name="pharmacyName" value={formValues.pharmacyName} onChange={handleChange} theme={theme} />
                  <Input label="License Number" name="licenseNumber" value={formValues.licenseNumber} onChange={handleChange} theme={theme} />
                </>
              )}

              {/* SECURITY STEP */}
              {step === 3 && (
                <>
                  <Input label="Email" name="email" type="email" value={formValues.email} onChange={handleChange} theme={theme} />
                  <Input label="Password" name="password" type="password" value={formValues.password} onChange={handleChange} theme={theme} />
                </>
              )}

              {/* NAVIGATION */}
              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="flex-1 py-2 border rounded">
                    Back
                  </button>
                )}

                {step < totalSteps && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-2 text-white rounded"
                    style={{ background: theme.primary }}
                  >
                    Continue
                  </button>
                )}

                {step === totalSteps && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 text-white rounded font-semibold disabled:opacity-50"
                    style={{
                      background: `linear-gradient(to right, ${theme.buttonFrom}, ${theme.buttonTo})`,
                    }}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border py-2 rounded flex items-center justify-center gap-2"
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


/* REUSABLE INPUT */
function Input({ label, name, theme, type = 'text', value, onChange }: any) {
  return (
    <div>
      <label className="text-gray-600 text-sm block mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        required
        className="w-full px-3 py-2 rounded border outline-none"
        style={{ borderColor: theme.border }}
      />
    </div>
  );
}

/* REUSABLE SELECT */
function Select({ name, theme, value, onChange }: any) {
  return (
    <div>
      <label className="text-gray-600 text-sm block mb-1">Gender</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        required
        className="w-full px-3 py-2 rounded border outline-none"
        style={{ borderColor: theme.border }}
      >
        <option value="">Select gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
    </div>
  );
}