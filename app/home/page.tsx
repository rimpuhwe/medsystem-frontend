// "use client";


// import Navbar from "@/components/Navbar";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { TagIcons } from "@/components/TagIcons";
// import Button from "@/components/Button";
// import FeatureCard from "@/components/FeatureCard";
// import NewsletterSection from "@/components/NewsletterSection";
// import Footer from "@/components/Footer";
// import { Stethoscope, FileText, ShieldCheck, Users, Clock, Shield } from "lucide-react";
// import Partners from "@/components/Partners";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
//       <Navbar />
//       {/* Hero Section */}
//       <main className="flex flex-1 flex-col items-center justify-center px-4 mt-18 py-16  bg-background w-full">
//         <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 w-full max-w-6xl mx-auto">
//           {/* Hero Texts */}
//           <motion.div
//             className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start text-center md:text-left"
//             initial={false}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           >
//             <div className="flex items-center gap-2 text-blue-600 ">
//               <Shield className="w-5 h-5" />
//               <span className="text-sm ">Republic of Rwanda - Ministry of Health</span>
//             </div>
//             <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
//               Digital Medical
//               <br />
//               <span className="text-blue-600">Ordinance System</span>
//             </h1>
//             <p className="text-md md:text-xl text-muted-foreground mb-5 max-w-lg">
//               Experience Rwanda's secure, efficient, and connected healthcare
//               platform. Manage digital prescriptions with verified authenticity,
//               and collaborate seamlessly between doctors, pharmacists, and
//               patients.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
//               <Button href="#overview" variant="primary" className="bg-gradient-to-br from-blue-500 to-teal-400 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
//                 Platform Overview
//               </Button>
//               <Button href="/dashboard/patient" variant="primary" className="bg-gradient-to-br from-blue-500 to-teal-400 text-white text-sm md:text-base px-4 py-4 md:px-6 md:py-3">
//                 Access Medical Dashboard
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-3 mt-4 justify-end">
//               {[
//                 { tag: "MOH Certified" },
//                 { tag: "HIPAA Compliant" },
//                 { tag: "24/7 Available" },
//               ].map(({ tag }) => (
//                 <span
//                   key={tag}
//                   className="flex items-center gap-3 px-5 py-2  text-xs font-medium"
//                   style={{ color: "#22c55e" }}
//                 >
//                   <span className="flex items-center justify-center">
//                     <TagIcons tag={tag} color="#22c55e" />
//                   </span>
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Hero Image */}
//           <motion.div
//             className="w-full md:w-1/2 flex justify-center md:justify-start items-center"
//             initial={false}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           >
//             <Image
//               src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png"
//               alt="Doctors, pharmacist, and patient interacting with the system"
//               width={600}
//               height={400}
//               className="rounded-2xl shadow-2xl border border-border bg-card"
//               priority
//             />
//           </motion.div>
//         </div>
//       </main>
//       {/* Features Section */}
//       <section className="w-full py-20 bg-muted/50 to-white flex flex-col items-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
//           Platform Features
//         </h2>
//         <p className="text-muted-foreground mb-10 text-center max-w-2xl">
//           Discover the core features that make the Digital Medical Ordinance
//           System secure, efficient, and easy to use for all healthcare
//           stakeholders in Rwanda.
//         </p>
//         <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
//           <FeatureCard
//             icon={<Stethoscope className="w-8 h-8 text-blue-600" />}
//             title="Doctor & Patient Management"
//             description="Easily manage patient records, appointments, and communication between doctors and patients in a secure environment."
//           />
//           <FeatureCard
//             icon={<FileText className="w-8 h-8 text-blue-600" />}
//             title="Digital Prescriptions"
//             description="Create, send, and track digital prescriptions with verified authenticity, reducing errors and fraud."
//           />
//           <FeatureCard
//             icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
//             title="Data Security & Compliance"
//             description="HIPAA-compliant and MOH-certified, your data is encrypted and protected at every step."
//           />
//           <FeatureCard
//             icon={<Users className="w-8 h-8 text-blue-600" />}
//             title="Multi-role Access"
//             description="Role-based dashboards for patients, doctors, pharmacists, and administrators for tailored experiences."
//           />
//           <FeatureCard
//             icon={<FileText className="w-8 h-8 text-blue-600" />}
//             title="Medicine Dispensing"
//             description="Pharmacists can view, verify, and dispense digital prescriptions efficiently, ensuring safe and accurate medication delivery."
//           />
//           <FeatureCard
//             icon={<Clock className="w-8 h-8 text-blue-600" />}
//             title="24/7 Platform Availability"
//             description="Access your medical data and services anytime, anywhere, with high system uptime."
//           />
//         </div>
//       </section>
//       <Partners />
//       {/* Newsletter Section */}
//       <NewsletterSection />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { TagIcons } from "@/components/TagIcons";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import {
  Stethoscope,
  FileText,
  ShieldCheck,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 w-full max-w-7xl mx-auto">
          
          {/* TEXT CONTENT */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Government Tag */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-600 text-sm">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Republic of Rwanda - Ministry of Health</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
              Digital Medical
              <br />
              <span className="text-blue-600">
                Ordinance System
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Experience Rwanda's secure, efficient, and connected healthcare
              platform. Manage digital prescriptions with verified authenticity,
              and collaborate seamlessly between doctors, pharmacists, and
              patients.
            </p>

            {/* Buttons */}
           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 w-full sm:w-auto justify-center lg:justify-start">
  <Button
    href="#overview"
    variant="primary"
    className="w-full sm:w-auto bg-gradient-to-br from-blue-500 to-teal-400 text-white px-6 py-3 text-sm sm:text-base"
  >
    Platform Overview
  </Button>

  <Button
    href="/dashboard/patient"
    variant="primary"
    className="w-full sm:w-auto bg-gradient-to-br from-blue-500 to-teal-400 text-white px-6 py-3 text-sm sm:text-base"
  >
    Access Medical Dashboard
  </Button>
</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              {["MOH Certified", "HIPAA Compliant", "24/7 Available"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-green-500"
                  >
                    <TagIcons tag={tag} color="#22c55e" />
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            className="hidden lg:flex w-full lg:w-1/2 justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <Image
                src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1771571672/ChatGPT_Image_Feb_20_2026_09_10_38_AM_nbmzo0.png"
                alt="Doctors, pharmacist, and patient interacting with the system"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl border border-border bg-card w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="w-full py-16 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
            Platform Features
          </h2>

          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Discover the core features that make the Digital Medical Ordinance
            System secure, efficient, and easy to use for all healthcare
            stakeholders in Rwanda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Stethoscope className="w-8 h-8 text-blue-600" />}
              title="Doctor & Patient Management"
              description="Manage patient records and communication securely."
            />

            <FeatureCard
              icon={<FileText className="w-8 h-8 text-blue-600" />}
              title="Digital Prescriptions"
              description="Create and track prescriptions with verified authenticity."
            />

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
              title="Data Security & Compliance"
              description="Encrypted, HIPAA-compliant, and MOH-certified."
            />

            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Multi-role Access"
              description="Role-based dashboards for tailored experiences."
            />

            <FeatureCard
              icon={<FileText className="w-8 h-8 text-blue-600" />}
              title="Medicine Dispensing"
              description="Efficient and secure medication verification."
            />

            <FeatureCard
              icon={<Clock className="w-8 h-8 text-blue-600" />}
              title="24/7 Availability"
              description="Access services anytime with high uptime."
            />
          </div>
        </div>
      </section>

      <Partners />

      <NewsletterSection />

      <Footer />
    </div>
  );
}