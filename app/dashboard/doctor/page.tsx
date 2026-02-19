export default function DoctorDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Doctor Dashboard</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Manage your patients, appointments, and prescriptions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">Today's Appointments</h3>
          <p className="text-muted-foreground">
            No appointments scheduled for today.
          </p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">Patient List</h3>
          <p className="text-muted-foreground">No patients assigned.</p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Recent Prescriptions</h3>
          <p className="text-muted-foreground">
            No recent prescriptions issued.
          </p>
        </div>
      </div>
    </div>
  );
}
