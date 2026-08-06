import { useEffect, useRef } from "react";
import s1 from "@/assets/hardscape/hardscape1.jpg";
import s2 from "@/assets/hardscape/hardscape2.jpg";
import s3 from "@/assets/hardscape/hardscape3.jpg";
import s4 from "@/assets/hardscape/hardscape4.jpg";
import s5 from "@/assets/hardscape/hardscape5.jpg";
import s6 from "@/assets/hardscape/hardscape6.jpg";
import s7 from "@/assets/hardscape/hardscape7.jpg";
import s8 from "@/assets/hardscape/hardscape8.jpg";
import s9 from "@/assets/hardscape/hardscape9.jpg";

// Lista de imágenes con sus títulos de arquitectura y clases de animación asignadas
const galleryItems = [
  {
    src: s1,
    title: "Rear Elevation & Custom Timber Deck",
    subtitle: "Two-story wooden deck integration with integrated staircase",
    colSpan: "col-span-12 lg:col-span-8",
    animation: "reveal-left",
  },
  {
    src: s2,
    title: "Covered Patio Lounge",
    subtitle: "Shaded ground-floor living area with natural stone veneer base",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    animation: "reveal-right",
  },
  {
    src: s3,
    title: "Landscape Perspective",
    subtitle: "Seamless transition between manicured lawn and hardscape elements",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    animation: "reveal-up",
  },
  {
    src: s4,
    title: "Flagstone Pavers & Pathway",
    subtitle: "Irregular natural stone stepping paths bordered by brick masonry",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    animation: "reveal-zoom",
  },
  {
    src: s5,
    title: "Balcony Joinery & Railing",
    subtitle: "Precision-crafted redwood balustrades with weather-resistant coating",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    animation: "reveal-up",
  },
  {
    src: s6,
    title: "Retaining Wall & Raised Planters",
    subtitle: "Terraced brick walling for integrated perimeter greenery",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-6",
    animation: "reveal-left",
  },
  {
    src: s7,
    title: "Outdoor Living Space",
    subtitle: "Designed for climate adaptability and year-round family entertainment",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-6",
    animation: "reveal-right",
  },
  {
    src: s8,
    title: "Material Harmony",
    subtitle: "Warm cedar hues juxtaposed with neutral stucco and stone accents",
    colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    animation: "reveal-up",
  },
  {
    src: s9,
    title: "Site Plan Overview",
    subtitle: "Comprehensive architectural transformation of residential yard",
    colSpan: "col-span-12 lg:col-span-8",
    animation: "reveal-zoom",
  },
];

export function Hardscape() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -0.08}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="Hardscape" className="relative py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      {/* Fondo decorativo con Parallax */}
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -right-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Cabecera del Proyecto */}
        {/* <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div> */}
            {/* <p className="kicker reveal reveal-fade"> — Outdoor Architecture</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
              <em className="italic text-accent">Hardscape</em>  &amp; Deck
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              California · Exterior Design &amp; Decking
            </p> */}
          {/* </div> */}
          {/* <p className="reveal reveal-fade max-w-md text-muted-foreground">
            A multi-level outdoor living concept merging custom timber decking, natural flagstone 
            paving, and structural stone masonry for an effortless California backyard experience.
          </p> */}
        {/* </div> */}

        {/* Resumen del Brief de Diseño */}
        <div className="reveal reveal-up bg-muted/30 border border-border/60 rounded-sm p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="kicker">Scope</p>
              <p className="font-display text-lg mt-1">Full Yard &amp; Decking</p>
            </div>
            <div>
              <p className="kicker">Primary Materials</p>
              <p className="font-display text-lg mt-1">Redwood, Flagstone, Stucco</p>
            </div>
            <div>
              <p className="kicker">Location</p>
              <p className="font-display text-lg mt-1">California, USA</p>
            </div>
            <div>
              <p className="kicker">Year</p>
              <p className="font-display text-lg mt-1">2025</p>
            </div>
          </div>
        </div>

        {/* Galería de Imágenes en Cuadrícula Animada */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`reveal ${item.animation} ${item.colSpan} group relative overflow-hidden rounded-sm bg-muted aspect-[16/10]`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Degradado inferior para legibilidad del texto */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Información sobre la imagen */}
              <div className="absolute bottom-4 left-4 right-4 text-background/95">
                <span className="text-[10px] tracking-[0.2em] uppercase text-background/70 block">
                  {String(idx + 1).padStart(2, "0")} — {item.subtitle}
                </span>
                <p className="font-display text-lg md:text-xl mt-0.5">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          All hardscape structures designed &amp; constructed in California
        </p>
      </div>
    </section>
  );
}
