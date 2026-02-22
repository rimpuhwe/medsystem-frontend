import React from "react";

type PatientRegisterProps = {
  step: number;
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export default function PatientRegisterForm({
  step,
  formData,
  onChange,
  showPassword,
  togglePasswordVisibility,
}: PatientRegisterProps) {
  if (step === 1) {
    return (
      <>
        <div className="text-left">
            <div>
              <label
                htmlFor="beneficiaryName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Beneficiary Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="beneficiaryName"
                name="beneficiaryName"
                value={formData.beneficiaryName ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter beneficiary name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email address"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="YYYY-MM-DD"
                required
              />
            </div>
        </div>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <div className="text-left">
          <div>
            <label
              htmlFor="insuranceProvider"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Insurance Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="insuranceProvider"
              name="insuranceProvider"
              value={formData.insuranceProvider ?? ""}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter insurance provider"
              required
            />
          </div>
          <div>
            <label
              htmlFor="insuranceNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Insurance Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="insuranceNumber"
              name="insuranceNumber"
              value={formData.insuranceNumber ?? ""}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter insurance number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="insuranceHolder"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Insurance Holder <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="insuranceHolder"
              name="insuranceHolder"
              value={formData.insuranceHolder ?? ""}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter insurance holder name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="holderEmployer"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Holder Employer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="holderEmployer"
              name="holderEmployer"
              value={formData.holderEmployer ?? ""}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter employer name"
              required
            />
          </div>
        </div>
      </>
    );
  }
  if (step === 3) {
    return (
      <>
        <div className="text-left">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Create Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password ?? ""}
              onChange={onChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 hover:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Create a secure password"
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </>
    );
  }
  return null;
}
