export default function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 bg-blue-500 border-t border-border flex flex-col items-center text-center text-xs md:text-sm text-white px-4">
      <div className="mb-2 font-semibold">
        Digital Medical Ordinance System
      </div>
      <div className="mb-2">Republic of Rwanda - Ministry of Health</div>
      <div className="flex flex-wrap justify-center gap-2">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
