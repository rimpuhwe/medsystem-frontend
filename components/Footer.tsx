export default function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-border flex flex-col items-center text-center text-xs text-muted-foreground">
      <div className="mb-2 font-semibold text-primary">
        Digital Medical Ordinance System
      </div>
      <div className="mb-2">Republic of Rwanda - Ministry of Health</div>
      <div className="flex gap-2">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <span>|</span>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
