import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="w-full py-24 flex flex-col items-center bg-gray-50">
      <div className="max-w-xl w-full flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-3 text-primary">
          <Mail className="w-8 h-8 mr-2 text-blue-600" />
          <span className="font-semibold text-3xl md:text-4xl text-blue-600">Join our Newsletter</span>
        </div>
        <p className="mb-6 text-muted-foreground text-sm md:text-base">
          Stay up to date with the latest updates, health tips, and platform
          features. No spam, ever.
        </p>
        <form className="flex w-full max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="off"
            className="flex-1 px-4 py-2 rounded-l-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-r-lg bg-blue-400 text-primary-foreground font-semibold hover:bg-blue-700/90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
