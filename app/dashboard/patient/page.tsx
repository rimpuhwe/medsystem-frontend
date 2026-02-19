export default function PatientDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">
        Patient Dashboard
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        View your medical records, appointments, and prescriptions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
          <p className="text-muted-foreground">No upcoming appointments.</p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">Recent Prescriptions</h3>
          <p className="text-muted-foreground">No recent prescriptions.</p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
          <p className="text-muted-foreground">
            Your medical records will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
