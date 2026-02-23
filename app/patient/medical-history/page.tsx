"use client";

import { useState } from "react";
import MedicalHistoryVerification from "@/components/medical/medicalHistoryVerifivation";
import MedicalHistoryViewer from "@/components/medical/medicalHistoryViewer";

export default function MedicalHistoryPage() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      {!verified ? (
        <MedicalHistoryVerification onVerified={() => setVerified(true)} />
      ) : (
        <MedicalHistoryViewer />
      )}
    </div>
  );
}
