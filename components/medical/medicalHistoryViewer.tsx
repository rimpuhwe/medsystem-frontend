"use client";

import { Card } from "@/components/ui/card";
import  Button  from "../Button";

export default function MedicalHistoryViewer() {

  return (

    <Card className="p-6 w-full max-w-xl">

      <h2 className="font-semibold mb-4">
        Medical History
      </h2>

      <div className="border p-4 rounded mb-4">

        <p>
          Clinic: Kigali Medical Center
        </p>

        <p>
          Diagnosis: Respiratory Infection
        </p>

        <p>
          Date: 2026-01-10
        </p>

      </div>

      <Button>
        Download Medical History
      </Button>

    </Card>
  );
}