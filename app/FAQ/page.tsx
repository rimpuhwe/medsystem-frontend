"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "What is MedEase?",
    a: "MedEase is a digital medical ordinance platform that connects patients, doctors, and pharmacies for secure, efficient healthcare management, including digital prescriptions and appointment scheduling.",
  },
  {
    q: "How do I register as a patient?",
    a: "Click on 'Register' and fill in your personal details, national ID, contact information, and other required fields. Agree to the terms to complete registration.",
  },
  {
    q: "Can I access my medical records online?",
    a: "Yes, once registered, patients can securely view their medical records, prescriptions, and appointment history from their dashboard.",
  },
  {
    q: "How are digital prescriptions sent to pharmacies?",
    a: "Doctors issue digital prescriptions that are instantly available to both the patient and their chosen pharmacy through the platform with the help of the Reference Number .",
  },
  {
    q: "Is my health data secure?",
    a: "Absolutely. MedEase uses advanced encryption and privacy protocols to ensure all your health data is safe and confidential.",
  },
  {
    q: "How do I book an appointment with a doctor?",
    a: "Log in to your dashboard, browse available doctors, and schedule an appointment at your convenience. You will receive notifications for upcoming visits.",
  },
  {
    q: "What if I forget my password?",
    a: "Use the 'Forgot Password' link on the login page to reset your password securely via your registered email or phone number.",
  },
  {
    q: "How do pharmacies verify prescriptions?",
    a: "Pharmacies access digital prescriptions directly through the platform, ensuring authenticity before dispensing medication.",
  },
  {
    q: "Can I provide feedback on my experience?",
    a: "Yes, after using the platform or completing a medical process, you can submit feedback to help us improve our services.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full max-w-2xl mt-14 mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-primary text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4 w-full">
          {FAQS.map((item, idx) => (
            <div
              key={idx}
              className="border border-border text-blue-500 w-full rounded-lg bg-card overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-left focus:outline-none hover:bg-primary/5 transition"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`ml-2 h-6 w-6 transition-transform ${open === idx ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`px-6 pb-4 text-base text-muted-foreground transition-all duration-300 ease-in-out ${open === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                style={{ willChange: "max-height, opacity" }}
                aria-hidden={open !== idx}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
