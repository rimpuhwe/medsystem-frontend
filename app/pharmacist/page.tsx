"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PharmacistHome() {
  const router = useRouter();

  useEffect(() => {
    router.push("/pharmacist/dashboard");
  }, [router]);

  return null;
}