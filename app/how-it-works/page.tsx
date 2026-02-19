"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleNav from "@/components/RoleNav";
import {
  User,
  Stethoscope,
  FileText,
  Pill,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import AnimatedBackground from "@/components/ui/animated-background";
import Image from "next/image";

const roleSteps = {
  patient: [
    {
      number: 1,
      title: "Register Your Account",
      description: (
        <>
          <span className="block mb-1">To create an account, you need:</span>
          <ul className="list-disc list-inside text-sm pl-2">
            <li>Full Name</li>
            <li>National ID</li>
            <li>Date of Birth</li>
            <li>Contact Information (email, phone)</li>
            <li>Secure Password</li>
            <li>Agree to Terms & Privacy Policy</li>
          </ul>
        </>
      ),
      icon: <User className="w-9 h-9 text-primary" />,
    },
    {
      number: 2,
      title: "Access Your Dashboard",
      description:
        "View your medical records, appointments, and digital prescriptions in one place.",
      icon: <ClipboardList className="w-7 h-7 text-primary" />,
    },
    {
      number: 3,
      title: "Book Appointments",
      description:
        "Schedule consultations with doctors and receive notifications for upcoming visits.",
      icon: <Stethoscope className="w-7 h-7 text-primary" />,
    },
    {
      number: 4,
      title: "Receive Prescriptions",
      description:
        "Get digital prescriptions from your doctor, which you can view and share with a pharmacy.",
      icon: <FileText className="w-7 h-7 text-primary" />,
    },
    {
      number: 5,
      title: "Collect Medicine",
      description:
        "Visit a pharmacy, show your digital prescription, and collect your medicine securely.",
      icon: <Pill className="w-7 h-7 text-primary" />,
    },
    {
      number: 6,
      title: "Track & Feedback",
      description:
        "Track your health journey and provide feedback on your experience.",
      icon: <CheckCircle className="w-7 h-7 text-primary" />,
    },
  ],
  doctor: [
    {
      number: 1,
      title: "Register & Verify",
      description: (
        <>
          <span className="block mb-1">To register as a doctor, you need:</span>
          <ul className="list-disc list-inside text-sm pl-2">
            <li>Full Name</li>
            <li>National ID</li>
            <li>Date of Birth</li>
            <li>Contact Information (email, phone)</li>
            <li>Medical License Number</li>
            <li>Specialization</li>
            <li>Secure Password</li>
            <li>Agree to Terms & Privacy Policy</li>
          </ul>
        </>
      ),
      icon: <User className="w-9 h-9 text-primary" />,
    },
    {
      number: 2,
      title: "Manage Patients",
      description:
        "Access patient records, view appointment requests, and manage your schedule.",
      icon: <ClipboardList className="w-7 h-7 text-primary" />,
    },
    {
      number: 3,
      title: "Consult & Diagnose",
      description:
        "Conduct consultations, update medical records, and provide diagnoses.",
      icon: <Stethoscope className="w-7 h-7 text-primary" />,
    },
    {
      number: 4,
      title: "Issue Prescriptions",
      description:
        "Create and send digital prescriptions directly to patients and pharmacies.",
      icon: <FileText className="w-7 h-7 text-primary" />,
    },
    {
      number: 5,
      title: "Follow Up",
      description:
        "Monitor patient progress and schedule follow-up appointments as needed.",
      icon: <CheckCircle className="w-7 h-7 text-primary" />,
    },
  ],
  pharmacist: [
    {
      number: 1,
      title: "Register & Verify",
      description: (
        <>
          <span className="block mb-1">
            To register as a pharmacy, you need:
          </span>
          <ul className="list-disc list-inside text-sm pl-2">
            <li>Pharmacy Name</li>
            <li>Pharmacy License Number</li>
            <li>Owner/Manager Full Name</li>
            <li>National ID</li>
            <li>Contact Information (email, phone)</li>
            <li>Location/Address</li>
            <li>Secure Password</li>
            <li>Agree to Terms & Privacy Policy</li>
          </ul>
        </>
      ),
      icon: <User className="w-9 h-9 text-primary" />,
    },
    {
      number: 2,
      title: "View Prescriptions",
      description:
        "Access digital prescriptions sent by doctors and presented by patients.",
      icon: <FileText className="w-7 h-7 text-primary" />,
    },
    {
      number: 3,
      title: "Dispense Medicine",
      description:
        "Verify prescription authenticity and dispense the correct medicine to patients.",
      icon: <Pill className="w-7 h-7 text-primary" />,
    },
    {
      number: 4,
      title: "Update System",
      description:
        "Mark prescriptions as dispensed and keep records up to date.",
      icon: <ClipboardList className="w-7 h-7 text-primary" />,
    },
    {
      number: 5,
      title: "Feedback & Support",
      description:
        "Provide feedback and support to improve the healthcare process.",
      icon: <CheckCircle className="w-7 h-7 text-primary" />,
    },
  ],
};

export default function HowItWorksV2() {
  const [role, setRole] = useState("patient");
  const steps = roleSteps[role];
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      {/* Hero Section with background image and overlay */}
      <div className="relative w-full h-[340px] md:h-[420px] mt-15 flex items-center justify-center mb-8">
        <Image
          src="/how-it-works-hero.jpg"
          alt="How it works hero"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white text-center drop-shadow-lg">
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl drop-shadow">
            Step-by-step guide for patients, doctors, and pharmacists to get
            started and use the Digital Medical Ordinance System.
          </p>
        </div>
      </div>
      {/* Small role navbar */}
      <RoleNav selected={role} onSelect={setRole} />
      {/* Steps for selected role */}
      <main className="flex-1 w-full flex flex-col items-center px-4 pb-16 bg-background">
        <section className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
          <AnimatedBackground
            className="rounded-xl bg-primary/5 dark:bg-primary/10 transition-all duration-300"
            transition={{ type: 'spring', bounce: 0.25, duration: 0.7 }}
            enableHover
          >
            {steps.map((step, idx) => (
              <div
                key={step.number}
                data-id={`step-${idx}`}
                className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-0 px-6 py-10 md:py-16 min-h-[200px] md:min-h-[240px]"
              >
                {/* Floating number and icon */}
                <div className="flex flex-col items-center md:items-end md:w-1/2 md:pr-12">
                  <div className="relative mb-4 md:mb-0">
                    <span className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-5xl md:text-6xl font-extrabold shadow-2xl border-8 border-background animate-pulse-slow">
                      {step.number}
                    </span>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background rounded-full p-3 shadow-lg border border-primary/20">
                      {step.icon}
                    </span>
                  </div>
                </div>
                {/* Step content */}
                <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-primary drop-shadow-lg tracking-tight animate-fade-in">
                    {step.title}
                  </h2>
                  <div className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-slow">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </AnimatedBackground>
        </section>
      </main>
      <Footer />
    </div>
  );
}
