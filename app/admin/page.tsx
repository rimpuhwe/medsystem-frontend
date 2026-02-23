export default function AdminDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Admin Dashboard</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Control and monitor the entire healthcare system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">System Users</h3>
          <p className="text-muted-foreground">No users registered yet.</p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow border border-border">
          <h3 className="text-xl font-semibold mb-2">System Activity</h3>
          <p className="text-muted-foreground">No recent activity.</p>
        </div>
      </div>
    </div>
  );
}
