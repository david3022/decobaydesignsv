import { useEffect, useState } from "react";

export function QuotePopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => setOpen(true));
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(() => setMounted(false), 500);
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-popup-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-500 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        aria-label="Close"
        onClick={close}
        className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl transition-all duration-700 ease-out ${
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.96] opacity-0"
        }`}
      >
        {/* Decorative gradient accent */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <button
          aria-label="Close popup"
          onClick={close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        <div className="relative px-8 py-12 md:px-12 md:py-14 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground">DECOBAY · California</p>
          <h2
            id="consultation-popup-title"
            className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]"
          >
            Let's design your <em className="italic text-accent">space</em>.
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-sm mx-auto">
            Ready to bring your vision to life? Book a complimentary 30-minute consultation — no forms needed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/zdimensionz2/30min"
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="px-7 py-3 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors text-sm tracking-wide"
            >
              Schedule your call →
            </a>
            <button
              onClick={close}
              className="px-7 py-3 rounded-full border border-border hover:border-foreground transition-colors text-sm tracking-wide"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
