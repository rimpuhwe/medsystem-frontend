export default function PharmacistDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">
        Pharmacist Dashboard
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        View and manage prescriptions for patients.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">Pending Prescriptions</h3>
          <p className="text-muted-foreground">No pending prescriptions.</p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">
            Completed Prescriptions
          </h3>
          <p className="text-muted-foreground">No completed prescriptions.</p>
        </div>
      </div>
    </div>
  );
}
