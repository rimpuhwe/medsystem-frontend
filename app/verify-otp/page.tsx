"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, ArrowLeft, AlertCircle } from "lucide-react";

/**
 * OTP verification page
 *
 * Primary flow: verify OTP after registration
 *   - register page stores: registrationEmail, registrationOTP (dev), registrationReferenceNumber, registrationRole
 *   - user is sent here with ?mode=register
 *   - page calls backend /api/auth/verify-otp and then redirects to /login
 *
 * Secondary flow: verify OTP for password reset
 *   - forgot-password flow stores: resetEmail, resetOTP
 *   - user is sent here with ?mode=reset
 *   - page compares OTP with resetOTP and then redirects to /reset-password
 */

type OTPMode = "register" | "reset";

export default function VerifyOTP() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<OTPMode>("register");

    useEffect(() => {
        const paramMode = (searchParams.get("mode") as OTPMode) || "register";
        setMode(paramMode);

        if (paramMode === "register") {
            const regEmail = localStorage.getItem("registrationEmail");
            if (!regEmail) {
                router.push("/register");
                return;
            }
            setEmail(regEmail);
        } else {
            const resetEmail = localStorage.getItem("resetEmail");
            if (!resetEmail) {
                router.push("/forgot-password");
                return;
            }
            setEmail(resetEmail);
        }
    }, [router, searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setInfo("");

        if (!otp) {
            setError("OTP is required");
            return;
        }

        setIsLoading(true);

        try {
            if (mode === "register") {
                // Backend verification of OTP after registration
                const response = await fetch("/api/auth/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || data.error || "Failed to verify OTP. Please try again.");
                    setIsLoading(false);
                    return;
                }

                // Clear registration-related data
                localStorage.removeItem("registrationEmail");
                localStorage.removeItem("registrationOTP");
                localStorage.removeItem("registrationReferenceNumber");
                localStorage.removeItem("registrationRole");

                // After successful verification, send user to login
                router.push("/login");
            } else {
                // Password reset flow: simple local OTP check
                const storedOTP = localStorage.getItem("resetOTP");
                if (otp === storedOTP) {
                    router.push("/reset-password");
                } else {
                    setError("Invalid OTP. Please try again.");
                    setIsLoading(false);
                }
            }
        } catch (err: any) {
            console.error("OTP verification error:", err);
            setError("An error occurred while verifying the OTP. Please try again.");
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (mode === "register") {
            router.push("/my-account/register");
        } else {
            router.push("/forgot-password");
        }
    };

    const handleResend = async () => {
        setError("");
        setInfo("");

        // Only backend resend is supported for registration flow
        if (mode !== "register") {
            setError("Resend OTP is only available for registration verification.");
            return;
        }

        if (!email) {
            setError("Missing email address. Please go back and start the registration again.");
            return;
        }

        setResending(true);
        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || data.error || "Failed to resend OTP. Please try again.");
            } else {
                setInfo(data.message || "A new OTP has been sent to your email.");
            }
        } catch (err: any) {
            console.error("Resend OTP error:", err);
            setError("Unable to resend OTP at the moment. Please try again later.");
        } finally {
            setResending(false);
        }
    };

    const title =
        mode === "register" ? "Verify your email" : "Verify OTP to reset password";
    const subtitle =
        mode === "register"
            ? `Enter the OTP sent to ${email} to activate your account.`
            : `Enter the OTP sent to ${email} to continue resetting your password.`;

    return (
        <main
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: "#090A0A" }}
        >
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover-text-gray-800 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div
                                className="rounded-xl flex items-center justify-center shadow-lg"
                                style={{
                                    background: "linear-gradient(45deg, #0ea5e9 0%, #06b6d4 100%)",
                                    width: "66px",
                                    height: "66px",
                                }}
                            >
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-blue-500 mb-2">{title}</h1>
                        <p className="text-gray-600 text-sm">{subtitle}</p>
                    </div>

                    {(error || info) && (
                        <div className="mb-4 space-y-2">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}
                            {info && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                    {info}
                                </div>
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50 transition-all shadow-lg"
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </button>

                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending || !email || mode !== "register"}
                                className="w-full text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                {resending ? "Resending OTP..." : "Didn’t receive the code? Resend OTP"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
