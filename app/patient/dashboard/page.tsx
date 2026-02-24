'use client'
import DashboardHeader from "@/components/dashboard/dashboard-header"
import ProfileOverview from "@/components/dashboard/profile-overview"
import MedicalHistory from "@/components/dashboard/medical-history"
import MedicalInformation from "@/components/dashboard/medical-information"
import MyPrescriptions from "@/components/dashboard/my-prescriptions"
import JoinQueue from "@/components/dashboard/join-queue"
import { useState , useEffect } from "react"
import { apiRequest } from "@/utils/api";

export default function Dashboard() {
const [profile, setProfile] = useState<any>(null);
const [token, setToken] = useState("");



 // Load all patient data
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
    const loadData = async () => {
      try {
        const profileRes = await apiRequest("https://medsystemapplication.onrender.com/api/patient", storedToken);

        if (profileRes.ok)
          setProfile(await profileRes.json());

      } catch (error) {
        console.error(error);
      } 
    };

    loadData();
  }, []);
  return (
    <main className="min-h-screen bg-gray-50 relative">
      <DashboardHeader />
      <div className="px-4 py-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileOverview 
              name={profile?.fullName}
              initials={profile?.initials}
              referenceId={profile?.referenceNumber}
              dateOfBirth={profile?.dateOfBirth}
              insurance={profile?.insurance}
              email={profile?.email}
              phone={profile?.phone}
            />
            <MedicalInformation chronicDiseases={profile?.chronicDiseases} allergies={profile?.allergies} />
            <MyPrescriptions />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <JoinQueue token={token} />
            <MedicalHistory />
          </div>
        </div>
      </div>
    </main>
  );
}