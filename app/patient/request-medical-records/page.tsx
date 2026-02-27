"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import { Input } from "@/components/ui/Input"

export default function RequestMedicalRecords() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const code = generateCode()
      setGeneratedCode(code)
      console.log('🔐 VERIFICATION CODE:', code)
      console.log('📧 Email:', email)
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err: any) {
      setError("Failed to generate verification code.")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async () => {
    setIsLoading(true)
    setError("")
    
    if (verificationCode === generatedCode) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push("/patient/report-ready")
      setIsLoading(false)
    } else {
      setError("Invalid verification code. Please try again.")
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Verification Code Sent</h1>
              <p className="text-sm text-gray-600 mt-2">
                We've sent a 6-digit verification code to <strong>{email}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Please check your email inbox and enter the code below.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="text-center tracking-widest"
              />
              <button 
                onClick={handleVerification}
                disabled={verificationCode.length !== 6 || isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
            </div>

            <Link 
              href="/patient/dashboard" 
              className="block w-full border border-gray-300 bg-white hover:bg-gray-50 py-2 px-4 rounded-md text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        
        <Link href="/patient/dashboard" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          
          <div>
            <h1 className="text-3xl font-semibold text-blue-500">Request Medical Records</h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">Secure verification required</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              Enter your email address to receive a verification code for accessing your complete medical history.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Verification Code
                </>
              )}
            </button>
          </form>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Why do we need verification?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To protect your sensitive medical information, we require email verification before providing access to
              your complete medical history.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
