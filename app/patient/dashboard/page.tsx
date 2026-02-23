import DashboardHeader from "@/components/dashboard/dashboard-header"
import ProfileOverview from "@/components/dashboard/profile-overview"
import MedicalHistory from "@/components/dashboard/medical-history"
import MedicalInformation from "@/components/dashboard/medical-information"
import MyPrescriptions from "@/components/dashboard/my-prescriptions"
import JoinQueue from "@/components/dashboard/join-queue"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 relative">
      <DashboardHeader />
      <div className="px-4 py-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileOverview 
              name="<name>"
              initials="<initials>"
              referenceId="<reference_id>"
              dateOfBirth="<date_of_birth>"
              insurance="<insurance_provider>"
              email="<email>"
              phone="<phone_number>"
            />
            <MedicalInformation />
            <MyPrescriptions />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <JoinQueue />
            <MedicalHistory />
          </div>
        </div>
      </div>
    </main>
  );
}