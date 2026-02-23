"use client";

import { Card } from "@/components/ui/card";
import  Button  from "../Button";
import { Activity, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QueueCard() {

  const router = useRouter();

  const inQueue = false;

  if (!inQueue) {

    return (
      <Card className="p-6">

        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-blue-600"/>
          <h3 className="font-semibold">
            Consultation Queue
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Join the queue to receive consultation remotely
        </p>

        <Button
          onClick={() => router.push("/join-queue")}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2"/>
          Join Queue
        </Button>

      </Card>
    );
  }

  return null;
}