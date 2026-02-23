import clsx from "clsx";

export default function RoleNav({ selected, onSelect }: { selected: string; onSelect: (role: string) => void }) {
  const roles = [
    { key: "patient", label: "Patient" },
    { key: "doctor", label: "Doctor" },
    { key: "pharmacist", label: "Pharmacy" },
  ];
  return (
    <nav className="flex gap-4 justify-center my-8">
      {roles.map((role) => (
        <button
          key={role.key}
          className={clsx(
            "px-6 py-2 rounded-full font-semibold text-sm transition border",
            selected === role.key
              ? "bg-primary text-primary-foreground border-primary shadow"
              : "bg-muted text-foreground border-border hover:bg-primary/10"
          )}
          onClick={() => onSelect(role.key)}
          type="button"
        >
          {role.label}
        </button>
      ))}
    </nav>
  );
}
