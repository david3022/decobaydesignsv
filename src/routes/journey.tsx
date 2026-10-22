import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BANNER = "https://live.staticflickr.com/65535/55604809784_17d40a7182_b.jpg";

export const Route = createFileRoute("/journey")({
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />

      {/* Banner principal */}
      <section className="relative h-[40vh] md:h-[55vh] overflow-hidden">
        <img
          src={BANNER}
          alt="DECOBAY Interiors Microsite Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <p className="kicker text-accent reveal reveal-fade">Our Story</p>
          <h1 className="reveal reveal-up text-3xl md:text-5xl font-display text-foreground drop-shadow-lg mt-2">
            A Visual Journey
          </h1>
        </div>
      </section>

      {/* Flipbook de Heyzine */}
      <section className="relative py-12 px-4 md:px-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <iframe
            allowFullScreen
            allow="autoplay; fullscreen; clipboard-write"
            src="https://heyzine.com/flip-book/a2eb938f6c.html"
            title="DECOBAY Flipbook"
            className="w-full h-[70vh] md:h-[600px] border border-border rounded-lg"
          />
        </div>
      </section>

      <div id="footer">
        <Footer />
      </div>
    </main>
  );
}