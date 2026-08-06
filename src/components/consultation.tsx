export function Consultation() {
  return (
    <section id="consultation" className="py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <p className="kicker reveal reveal-fade"> — Start</p>
        <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl max-w-3xl">
          Ready to bring your <em className="italic text-accent">vision</em> to life?
        </h2>
        <p className="reveal reveal-up mt-6 text-muted-foreground max-w-xl">
          Schedule a complimentary 30-minute consultation to discuss your project, explore
          possibilities, and discover how Decobay Design can transform your space.
        </p>

        <div className="reveal reveal-up mt-12 p-10 md:p-14 border border-accent/30 bg-card rounded-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-3xl md:text-4xl">Book your free consultation</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Choose a time that works for you directly on Calendly. No extra forms needed.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/70 bg-background/50">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm tracking-wide">Free consultation · 30 minutes</span>
              </div>
            </div>
            <a
              href="https://calendly.com/zdimensionz2/30min"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors text-base tracking-wide"
            >
              Schedule your call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
