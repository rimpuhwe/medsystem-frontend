import React from "react";

type PharmacistRegisterProps = {
  step: number;
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export default function PharmacistRegisterForm({
  step,
  formData,
  onChange,
  showPassword,
  togglePasswordVisibility,
}: PharmacistRegisterProps) {
  if (step === 1) {
    return (
      <>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2 text-left"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName ?? ""}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2 text-left"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email ?? ""}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your email address"
            autoComplete="off"
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
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
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
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <div>
          <label
            htmlFor="pharmacyName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pharmacy Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pharmacyName"
            name="pharmacyName"
            value={formData.pharmacyName ?? ""}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter pharmacy name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            License Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber ?? ""}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter license number"
            required
          />
        </div>
      </>
    );
  }
  if (step === 3) {
    return (
      <>
        <div>
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
              className="w-full px-4 py-3 pr-12 border border-gray-300 hover:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
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
