"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input}  from "../ui/Input";
import  Button  from "../Button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JoinQueueForm() {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clinic: "",
    service: "",
    doctor: ""
  });

  const handleJoin = async () => {

    setLoading(true);

    await new Promise(r => setTimeout(r, 2000));

    router.push("/dashboard");
  };

  return (

    <Card className="p-6 w-full max-w-md">

      <h2 className="font-semibold mb-4">
        Join Consultation Queue
      </h2>

      {step === 1 && (

        <>
          <Input
            placeholder="Clinic Name"
            onChange={(e)=>setForm({...form, clinic:e.target.value})}
          />

          <Input
            className="mt-3"
            placeholder="Service"
            onChange={(e)=>setForm({...form, service:e.target.value})}
          />

          <Button
            className="mt-4 w-full"
            onClick={()=>setStep(2)}
          >
            Continue
          </Button>
        </>
      )}

      {step === 2 && (

        <>
          <Input
            placeholder="Doctor (optional)"
            onChange={(e)=>setForm({...form, doctor:e.target.value})}
          />

          <Button
            className="mt-4 w-full"
            onClick={handleJoin}
          >

            {loading
              ? <Loader2 className="animate-spin"/>
              : "Confirm Join"
            }

          </Button>
        </>
      )}

    </Card>
  );
}