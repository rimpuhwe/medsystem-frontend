"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "../ui/Input";
import Button from "../Button";

export default function MedicalHistoryVerification({ onVerified }: any) {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const sendOTP = async () => {

    await fetch("/api/send-otp", {
      method:"POST",
      body:JSON.stringify({email})
    });

    setStep(2);
  };

  const verifyOTP = async () => {

    await fetch("/api/verify-otp", {
      method:"POST",
      body:JSON.stringify({otp})
    });

    onVerified();
  };

  return (

    <Card className="p-6 w-full max-w-md">

      <h2 className="font-semibold mb-4">
        Verify access to Medical History
      </h2>

      {step === 1 && (

        <>
          <Input
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <Button
            className="mt-4 w-full"
            onClick={sendOTP}
          >
            Send Verification Code
          </Button>
        </>
      )}

      {step === 2 && (

        <>
          <Input
            placeholder="Enter verification code"
            onChange={(e)=>setOtp(e.target.value)}
          />

          <Button
            className="mt-4 w-full"
            onClick={verifyOTP}
          >
            Verify
          </Button>
        </>
      )}

    </Card>
  );
}