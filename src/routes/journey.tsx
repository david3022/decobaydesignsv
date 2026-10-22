import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BANNER = "https://live.staticflickr.com/65535/55604809784_17d40a7182_b.jpg";
const PAGES = [
  "https://live.staticflickr.com/65535/55604746218_79e6ebb96d_b.jpg",
  "https://live.staticflickr.com/65535/55605025460_28f23e7a06_b.jpg",
  "https://live.staticflickr.com/65535/55603600777_edb9772d0b_b.jpg",
  "https://live.staticflickr.com/65535/55604619636_b66d2a8760_b.jpg",
  "https://live.staticflickr.com/65535/55604824604_d5287f3735_b.jpg",
  "https://live.staticflickr.com/65535/55604746188_5fc08d842c_b.jpg",
];

export const Route = createFileRoute("/journey")({
  component: JourneyPage,
});

function JourneyPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = PAGES.length;
  // Hay 6 imágenes + 1 pantalla final = 7 "slides"
  const totalSlides = total + 1;

  // Índice donde debe detenerse el autoplay: penúltima posición (imagen 6 de 6)
  // totalSlides - 2 = 5 (índice de la última imagen), la pantalla final es totalSlides - 1 = 6
  const autoplayStopIndex = total - 1; // = 5

  // Actualizar el índice actual al hacer scroll horizontal
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrentIndex(Math.min(index, totalSlides - 1));
  };

  // Navegar a un slide concreto
  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, totalSlides - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const goPrev = () => scrollTo(currentIndex - 1);
  const goNext = () => scrollTo(currentIndex + 1);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  // 🔑 Autoplay: avanza cada 3s hasta llegar a la penúltima imagen
  useEffect(() => {
    // Si ya alcanzamos o superamos el índice de parada, no hacer nada
    if (currentIndex >= autoplayStopIndex) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // Detenerse en la penúltima imagen (no entrar a la pantalla final)
        if (next >= autoplayStopIndex) {
          scrollTo(autoplayStopIndex);
          clearInterval(interval);
          return autoplayStopIndex;
        }
        scrollTo(next);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, autoplayStopIndex]);

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

      {/* Contenedor de scroll horizontal */}
      <section className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth h-[80vh] md:h-[85vh] hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {PAGES.map((src, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-full h-full flex items-center justify-center px-4 md:px-20 bg-background"
            >
              <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <img
                  src={src}
                  alt={`Página ${i + 1} de DECOBAY Interiors`}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <span className="absolute bottom-4 right-4 text-sm text-muted-foreground bg-background/70 backdrop-blur px-3 py-1 rounded-full">
                  {i + 1} / {total}
                </span>
              </div>
            </div>
          ))}

          {/* Pantalla final */}
          <div className="snap-center shrink-0 w-full h-full flex flex-col items-center justify-center px-6 bg-muted/30">
            <div className="h-px w-12 bg-accent mb-6" />
            <h3 className="text-2xl md:text-3xl font-display mb-3">End of the story</h3>
            <p className="text-muted-foreground max-w-sm text-center mb-8">
              Keep scrolling down to discover more, or get in touch with us.
            </p>
            <a
              href="#footer"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
            >
              Continue ↓
            </a>
          </div>
        </div>

        {/* Flecha izquierda */}
        <button
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Imagen anterior"
          className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center border border-border/60 bg-white text-foreground shadow-lg transition-all ${
            isFirst
              ? "opacity-0 pointer-events-none"
              : "opacity-100 hover:bg-accent hover:text-primary-foreground hover:border-accent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Flecha derecha */}
        <button
          onClick={goNext}
          disabled={isLast}
          aria-label="Imagen siguiente"
          className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center border border-border/60 bg-white text-foreground shadow-lg transition-all ${
            isLast
              ? "opacity-0 pointer-events-none"
              : "opacity-100 hover:bg-accent hover:text-primary-foreground hover:border-accent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Indicador de progreso horizontal */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all pointer-events-auto ${
                i === currentIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Ir a la sección ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <div id="footer">
        <Footer />
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}