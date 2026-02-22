import React, { useState } from "react";
import PatientRegisterForm from "../forms/patientRegister";
import PharmacistRegisterForm from "../forms/pharmacistRegister";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [registerRole, setRegisterRole] = useState<string | null>(null);
  const [registerStep, setRegisterStep] = useState(1);

  const roleColor =
    registerRole === "patient"
      ? "bg-blue-500 hover:bg-blue-600"
      : registerRole === "pharmacist"
        ? "bg-green-500 hover:bg-green-600"
        : "bg-gray-500 hover:bg-red-600";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle login/signup/register logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "" });
    setShowPassword(false);
    setRegisterRole(null);
    setRegisterStep(1);
  };

  const handleNextStep = () => setRegisterStep((s: number) => s + 1);
  const handlePrevStep = () => setRegisterStep((s: number) => s - 1);

  return (
    <div className="w-full min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(" +
              "https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png" +
              ")",
          }}
        />

        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative text-white max-w-lg z-10">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Secure access to your healthcare dashboard.
          </h1>
        </div>
      </div>

      {/* Right side - Login/Signup form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-4">
              <div className="w-6 h-6 bg-white rounded-sm relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-orange-500 rounded-b-sm"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-red-500 rounded-t-sm"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome Back" : "Join Us Today"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Welcome back to Digital Medical Ordinance System . Please login to your account"
                : " Start your journey with Digital Medical Ordinance System . Please create an account to access our platform."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isLogin ? (
              <React.Fragment>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email address"
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password ?? ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent outline-none transition-all"
                      placeholder="Enter your password"
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
                <div className="flex flex-col">
                  <label className="flex items-center mb-8">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded font-semibold text-white bg-blue-400 hover:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mt-4">
                  <span className="text-gray-600">Don't have an account?</span>{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Register
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Register role selection */}
                {!registerRole && (
                  <div className="flex justify-center gap-4 mb-6">
                    <button
                      type="button"
                      className="px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() => setRegisterRole("patient")}
                    >
                      Register as Patient
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded font-semibold text-white bg-green-500 hover:bg-green-600"
                      onClick={() => setRegisterRole("pharmacist")}
                    >
                      Register as Pharmacist
                    </button>
                  </div>
                )}
                {/* Register form for selected role */}
                {registerRole === "patient" && (
                  <PatientRegisterForm
                    step={registerStep}
                    formData={formData}
                    onChange={handleInputChange}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                )}
                {registerRole === "pharmacist" && (
                  <PharmacistRegisterForm
                    step={registerStep}
                    formData={formData}
                    onChange={handleInputChange}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                )}
                {/* Navigation buttons for register steps */}
                {registerRole && (
                  <div className="flex justify-between mt-4">
                    {registerStep > 1 && (
                      <button
                        type="button"
                        className="px-4 py-2 rounded font-semibold text-white bg-gray-500 hover:bg-gray-600"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    )}
                    <button
                      type="button"
                      className={`px-4 py-2 rounded font-semibold text-white ${roleColor}`}
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                )}
                {registerStep === 3 && (
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded font-semibold text-white ${roleColor} my-6 `}
                  >
                    Register new account
                  </button>
                )}
                <div className="text-center">
                  <span className="text-gray-600">Already have account?</span>{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </button>
                </div>
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
