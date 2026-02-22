"use client";


import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { TagIcons } from "@/components/TagIcons";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { Stethoscope, FileText, ShieldCheck, Users, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 mt-18 py-16  bg-background w-full">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 w-full max-w-6xl mx-auto">
          {/* Hero Texts */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start text-center md:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-sm ">Republic of Rwanda - Ministry of Health</span>
              </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Digital Medical
              <br />
              <span className="text-blue-600">Ordinance System</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-lg">
              Experience Rwanda's secure, efficient, and connected healthcare
              platform. Manage digital prescriptions with verified authenticity,
              and collaborate seamlessly between doctors, pharmacists, and
              patients. This Digital System ensures your medical data is
              protected, your care is coordinated, and your health is always
              accessible anytime, anywhere.
            </p>
            <div className="flex gap-4 w-full md:w-auto justify-center md:justify-start">
              <Button href="#overview" variant="primary">
                Platform Overview
              </Button>
              <Button href="/dashboard/patient" variant="outline">
                Access Medical Dashboard
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 justify-end">
              {[
                { tag: "MOH Certified" },
                { tag: "HIPAA Compliant" },
                { tag: "24/7 Available" },
              ].map(({ tag }) => (
                <span
                  key={tag}
                  className="flex items-center gap-3 px-5 py-2  text-xs font-medium"
                  style={{ color: "#22c55e" }}
                >
                  <span className="flex items-center justify-center">
                    <TagIcons tag={tag} color="#22c55e" />
                  </span>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-start items-center"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png"
              alt="Doctors, pharmacist, and patient interacting with the system"
              width={850}
              height={600}
              className="rounded-2xl shadow-2xl border border-border bg-card"
              priority
            />
          </motion.div>
        </div>
      </main>
      {/* Features Section */}
      <section className="w-full py-20 bg-muted/50 to-white flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Platform Features
        </h2>
        <p className="text-muted-foreground mb-10 text-center max-w-2xl">
          Discover the core features that make the Digital Medical Ordinance
          System secure, efficient, and easy to use for all healthcare
          stakeholders in Rwanda.
        </p>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <FeatureCard
            icon={<Stethoscope className="w-8 h-8" />}
            title="Doctor & Patient Management"
            description="Easily manage patient records, appointments, and communication between doctors and patients in a secure environment."
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Digital Prescriptions"
            description="Create, send, and track digital prescriptions with verified authenticity, reducing errors and fraud."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Data Security & Compliance"
            description="HIPAA-compliant and MOH-certified, your data is encrypted and protected at every step."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Multi-role Access"
            description="Role-based dashboards for patients, doctors, pharmacists, and administrators for tailored experiences."
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Medicine Dispensing"
            description="Pharmacists can view, verify, and dispense digital prescriptions efficiently, ensuring safe and accurate medication delivery."
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="24/7 Platform Availability"
            description="Access your medical data and services anytime, anywhere, with high system uptime."
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
